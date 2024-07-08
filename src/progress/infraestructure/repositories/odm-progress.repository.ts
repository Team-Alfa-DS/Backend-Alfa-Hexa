import { Model } from "mongoose";
import { Result } from "src/common/domain/result-handler/result";
import { Lesson } from "src/course/domain/entities/Lesson";
import { IOdmProgressRepository } from "src/progress/application/repositories/odm-progress.repository";
import { Progress } from "src/progress/domain/progress";
import { UserId } from "src/user/domain/value-objects/user-id";
import { OdmProgressEntity } from "../entities/odm-entities/odm-progress.entity";

export class OdmProgressRepository implements IOdmProgressRepository {

    private readonly progressModel: Model<OdmProgressEntity>;

    constructor (progressModel: Model<OdmProgressEntity>) {
        this.progressModel = progressModel;
    }


    saveProgress(progress: Progress): Promise<Result<Progress>> {
        throw new Error("Method not implemented.");
    }

    findProgressByUserCourse(userId: UserId, lessons: Lesson[]): Promise<Result<Progress[]>> {
        throw new Error("Method not implemented.");
    }

    async findLastProgressByUser(userId: UserId): Promise<Result<Progress>> {
        const users = await this.progressModel.find({'user.id': userId.Id}).sort({'lastTime': -1});
        throw new Error('boom')
    }
    findProgressByUser(userId: UserId): Promise<Result<Progress[]>> {
        throw new Error("Method not implemented.");
    }
    
}