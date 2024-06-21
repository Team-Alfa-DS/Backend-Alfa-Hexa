import { DataSource, Repository } from "typeorm";
import { ProgressEntity } from "../entities/progress.entity";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { Progress } from "src/progress/domain/progress";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { Lesson } from "src/course/domain/Lesson";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";


export class OrmProgressRepository extends Repository<ProgressEntity> implements IProgressRepository {

    private readonly ormProgressMapper: IMapper<Progress, ProgressEntity>;

    constructor(ormProgressMapper: IMapper<Progress, ProgressEntity>, dataSource: DataSource) {
        super(ProgressEntity, dataSource.manager);
        this.ormProgressMapper = ormProgressMapper;
    }

    async findProgressByUser(userId: string, runner: TransactionHandler): Promise<Result<Progress[]>> {
        const runnerTransaction = runner.getRunner(); 
        try {
            const progressUser = await runnerTransaction.manager.findBy(ProgressEntity, {user_id: userId});
            let progressDomainList: Progress[] = [];

            for (const progress of progressUser) {
                progressDomainList.push(await this.ormProgressMapper.toDomain(progress))
            }
            return Result.success(progressDomainList, 200);
        } catch (err) {
            return Result.fail(new Error(err.message), err.code || 500, err.message || 'Ha ocurrido un error inesperado');
        }
    }
    
    async findLastProgressByUser(userId: string, runner: TransactionHandler): Promise<Result<Progress>> {
        const runnerTransaction = runner.getRunner();
        try {
            const progress = await runnerTransaction.manager
            .createQueryBuilder(ProgressEntity, "progress")
            .where("progress.lastTime = (SELECT MAX(progress.lastTime) from progress) AND progress.user_id = :userId", {userId})
            .getOne();
            
            const progressDomain = await this.ormProgressMapper.toDomain(progress);
            return Result.success(progressDomain, 200);
        } catch (err) {
            return Result.fail(new Error(err.message), err.code || 500, err.message || 'Ha ocurrido un error inesperado');
        }
    }

    async saveProgress(progress: Progress, runner: TransactionHandler): Promise<Result<Progress>> {
        const runnerTransaction = runner.getRunner()
        try {
            const ormProgress = await this.ormProgressMapper.toOrm(progress);
            await runnerTransaction.manager.save(ProgressEntity, ormProgress);
            return Result.success<Progress>(progress, 200)
        } catch(err) {
            return Result.fail(new Error(err.message), err.code || 500, err.message || 'Ha ocurrido un error inesperado');
        }
    }
    
    async findProgressByUserCourse(userId: string, lessons: Lesson[], runner: TransactionHandler): Promise<Result<Progress[]>> {
        const runnerTransaction = runner.getRunner();
        try {
            const progressList = await runnerTransaction.manager.findBy(ProgressEntity, {user_id: userId});
            const progressCourse = progressList.filter(pro => lessons.findIndex(lesson => lesson.id == pro.lesson_id) != -1);
            const progressDomainList: Progress[] = [];
            
            for (const progress of progressCourse) {
                progressDomainList.push(await this.ormProgressMapper.toDomain(progress))
            }

            return Result.success(progressDomainList, 200)
        } catch(err) {
            return Result.fail(new Error(err.message), err.code || 500, err.message || 'Ha ocurrido un error inesperado');
        }

    }
}