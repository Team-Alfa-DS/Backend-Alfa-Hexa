import { IMapper } from "src/common/application/mappers/mapper.interface";
import { Progress } from "src/progress/domain/progress";
import { ProgressEntity } from "../entities/progress.entity";
import { ProgressMarkAsCompleted } from "src/progress/domain/value-objects/progress-markAsCompleted";
import { ProgressTime } from "src/progress/domain/value-objects/progress-time";
import { ProgressLastTime } from "src/progress/domain/value-objects/progress-lastTime";
import { ProgressUserId } from "src/progress/domain/value-objects/progress-userId";
import { ProgressLessonId } from "src/progress/domain/value-objects/progress-lessonId";

export class OrmProgressMapper implements IMapper<Progress, ProgressEntity> {

    async toOrm(domainEntity: Progress): Promise<ProgressEntity> {
        const ormProgress = ProgressEntity.create(
            domainEntity.LessonId.LessonId,
            domainEntity.UserId.UserId,
            domainEntity.MarkAsCompleted.MarkAsCompleted,
            domainEntity.Time.Time,
            domainEntity.LastTime.LastTime
        )
        return ormProgress;
    }

    async toDomain(ormEntity: ProgressEntity): Promise<Progress> {
        const domainProgress = Progress.create(
            ProgressUserId.create(ormEntity.user_id),
            ProgressLessonId.create(ormEntity.lesson_id),
            ProgressMarkAsCompleted.create(ormEntity.markAsCompleted),
            ProgressTime.create(ormEntity.time),
            ProgressLastTime.create(ormEntity.lastTime)
        )
        return domainProgress;
    }

}