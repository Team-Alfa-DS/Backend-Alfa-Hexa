import { DataSource, Repository } from "typeorm";
import { OrmProgressEntity } from "../entities/orm-entities/orm-progress.entity";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { Progress } from "src/progress/domain/progress";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { Lesson } from "src/course/domain/entities/Lesson";
import { UserId } from "src/user/domain/value-objects/user-id";
import { LessonId } from "src/course/domain/value-objects/lesson-id";


export class OrmProgressRepository extends Repository<OrmProgressEntity> implements IProgressRepository {

    private readonly ormProgressMapper: IMapper<Progress, OrmProgressEntity>;

    constructor(ormProgressMapper: IMapper<Progress, OrmProgressEntity>, dataSource: DataSource) {
        super(OrmProgressEntity, dataSource.manager);
        this.ormProgressMapper = ormProgressMapper;
    }

    async findProgressByUser(userId: UserId, runner: TransactionHandler): Promise<Result<Progress[]>> {
        const runnerTransaction = runner.getRunner(); 
        try {
            const progressUser = await runnerTransaction.manager.findBy(OrmProgressEntity, {user_id: userId.Id});
            let progressDomainList: Progress[] = [];

            for (const progress of progressUser) {
                progressDomainList.push(await this.ormProgressMapper.toDomain(progress))
            }
            return Result.success(progressDomainList);
        } catch (err) {
            return Result.fail(new Error(err.message));
        }
    }
    
    async findLastProgressByUser(userId: UserId, runner: TransactionHandler): Promise<Result<Progress>> {
        const runnerTransaction = runner.getRunner();
        try {
            const progress = await runnerTransaction.manager
            .createQueryBuilder(OrmProgressEntity, "progress")
            .where("progress.lastTime = (SELECT MAX(progress.lastTime) from progress) AND progress.user_id = :userId", {userId: userId.Id})
            .getOne();
            
            if (!progress) return Result.fail(new Error('El usuario no posee progreso'));

            const progressDomain = await this.ormProgressMapper.toDomain(progress);
            return Result.success(progressDomain);
        } catch (err) {
            return Result.fail(new Error(err.message));
        }
    }

    async saveProgress(progress: Progress, runner: TransactionHandler): Promise<Result<Progress>> {
        const runnerTransaction = runner.getRunner()
        try {
            const ormProgress = await this.ormProgressMapper.toPersistence(progress);
            await runnerTransaction.manager.save(OrmProgressEntity, ormProgress);
            return Result.success<Progress>(progress)
        } catch(err) {
            return Result.fail(new Error(err.message));
        }
    }
    
    async findProgressByUserCourse(userId: UserId, lessons: Lesson[], runner: TransactionHandler): Promise<Result<Progress[]>> {
        const runnerTransaction = runner.getRunner();
        try {
            const progressList = await runnerTransaction.manager.findBy(OrmProgressEntity, {user_id: userId.Id});
            const progressCourse = progressList.filter(pro => lessons.findIndex(lesson => lesson.id.equals(new LessonId(pro.lesson_id))) != -1);
            const progressDomainList: Progress[] = [];
            
            // for (const progress of progressCourse) {
            //     progressDomainList.push(await this.ormProgressMapper.toDomain(progress))
            // }

            return Result.success(progressDomainList)
        } catch(err) {
            return Result.fail(new Error(err.message));
        }

    }
}