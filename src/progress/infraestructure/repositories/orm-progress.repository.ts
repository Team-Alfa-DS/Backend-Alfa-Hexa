import { DataSource, Repository } from "typeorm";
import { ProgressEntity } from "../entities/progress.entity";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { Progress } from "src/progress/domain/progress";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { Lesson } from "src/course/domain/entities/Lesson";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { UserId } from "src/user/domain/value-objects/user-id";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { LessonId } from "src/course/domain/value-objects/lesson-id";


export class OrmProgressRepository extends Repository<ProgressEntity> implements IProgressRepository {

    private readonly ormProgressMapper: IMapper<Progress, ProgressEntity>;

    constructor(ormProgressMapper: IMapper<Progress, ProgressEntity>, dataSource: DataSource) {
        super(ProgressEntity, dataSource.manager);
        this.ormProgressMapper = ormProgressMapper;
    }

    async findProgressByUser(userId: UserId, runner: TransactionHandler): Promise<Result<Progress[]>> {
        const runnerTransaction = runner.getRunner(); 
        try {
            const progressUser = await this.find({relations: {lesson: true}, where: {user_id: userId.Id}});
            let progressDomainList: Progress[] = [];

            for (const progress of progressUser) {
                progressDomainList.push(await this.ormProgressMapper.toDomain(progress))
            }
            return Result.success(progressDomainList, 200);
        } catch (err) {
            return Result.fail(new Error(err.message), err.code || 500, err.message || 'Ha ocurrido un error inesperado');
        }
    }
    
    async findLastProgressByUser(userId: UserId, runner: TransactionHandler): Promise<Result<Progress>> {
        const runnerTransaction = runner.getRunner();
        try {
            const progressInc = await runnerTransaction.manager
            .createQueryBuilder(ProgressEntity, "progress")
            .where("progress.lastTime = (SELECT MAX(progress.lastTime) from progress) AND progress.user_id = :userId", {userId: userId.Id})
            .getOne();
            if (!progressInc) return Result.fail(new Error('El usuario no posee progreso'), 404, 'El usuario no posee progreso');
            const progress = await this.findOne({relations: {lesson: true}, where: {user_id: userId.Id, lesson_id: progressInc.lesson_id}})
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
    
    async findProgressByUserCourse(userId: UserId, lessons: Lesson[], runner: TransactionHandler): Promise<Result<Progress[]>> {
        const runnerTransaction = runner.getRunner();
        try {
            const progressList = await runnerTransaction.manager.find(ProgressEntity, {relations: {lesson: true}, where: {user_id: userId.Id}});
            const progressCourse = progressList.filter(pro => lessons.findIndex(lesson => lesson.id.equals(new LessonId(pro.lesson_id))) != -1);
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