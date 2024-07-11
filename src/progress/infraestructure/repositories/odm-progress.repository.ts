import { Model } from "mongoose";
import { Result } from "src/common/domain/result-handler/result";
import { Lesson } from "src/course/domain/entities/Lesson";
import { IOdmProgressRepository } from "src/progress/application/repositories/odm-progress.repository";
import { Progress } from "src/progress/domain/progress";
import { UserId } from "src/user/domain/value-objects/user-id";
import { OdmProgressEntity } from "../entities/odm-entities/odm-progress.entity";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { ProgressNotFoundException } from "src/progress/domain/exceptions/progress-not-found-exception";

export class OdmProgressRepository implements IOdmProgressRepository {

    private readonly progressModel: Model<OdmProgressEntity>;
    private readonly odmProgressMapper: IMapper<Progress, OdmProgressEntity>;

    constructor (progressModel: Model<OdmProgressEntity>, odmProgressMapper: IMapper<Progress, OdmProgressEntity>) {
        this.progressModel = progressModel;
        this.odmProgressMapper = odmProgressMapper;
    }


    async saveProgress(progress: Progress): Promise<void> {
        const progressPersistence = await this.odmProgressMapper.toPersistence(progress);
        await this.progressModel.create(progressPersistence);
    }

    async findProgressByUserCourse(userId: UserId, lessons: Lesson[]): Promise<Result<Progress[]>> {
        const progressList = await this.progressModel.find({'user.id': userId.Id});

        const progressCourse = progressList.filter(pro => lessons.findIndex(lesson => lesson.id.equals(new LessonId(pro.lesson.id))) != -1);
        const progressDomainList: Progress[] = [];

        for (const progress of progressCourse) {
            progressDomainList.push(await this.odmProgressMapper.toDomain(progress))
        }

        // if (progressDomainList.length == 0) return Result.fail(new ProgressNotFoundException('El usuario no posee progreso en ningun curso'));
        if (progressDomainList.length == 0) { throw new ProgressNotFoundException('El usuario no posee progreso en ningun curso')}
        return Result.success(progressDomainList)
    }

    async findLastProgressByUser(userId: UserId): Promise<Result<Progress>> {
        const progress = await this.progressModel.findOne({'user.id': userId.Id}).sort({'lastTime': -1});

        // if (!progress) return Result.fail(new ProgressNotFoundException(`
        //     No se encuentra el ultimo progreso del usuario, ya que no tiene progreso`));
        if (!progress) { throw new ProgressNotFoundException(`No se encuentra el ultimo progreso del usuario, ya que no tiene progreso`)}
        
        const progressDomain = await this.odmProgressMapper.toDomain(progress)
        return Result.success(progressDomain);
    }

    async findProgressByUser(userId: UserId): Promise<Result<Progress[]>> {
        const progressUser = await this.progressModel.find({'user.id': userId.Id});
        let progressDomainList: Progress[] = [];

        for (const progress of progressUser) {
            progressDomainList.push(await this.odmProgressMapper.toDomain(progress))
        }
        // if (progressDomainList.length == 0) return Result.fail(new ProgressNotFoundException(`
        //     El usuario con el id ${userId.Id} no posee progreso`));
        if (progressDomainList.length == 0) { throw new ProgressNotFoundException(`El usuario con el id ${userId.Id} no posee progreso`)}
        return Result.success(progressDomainList);
    }
    
}