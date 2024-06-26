import { IMapper } from "src/common/application/mappers/mapper.interface";
import { Progress } from "src/progress/domain/progress";
import { ProgressEntity } from "../entities/progress.entity";
import { ProgressMarkAsCompleted } from "src/progress/domain/value-objects/progress-markAsCompleted";
import { ProgressTime } from "src/progress/domain/value-objects/progress-time";
import { ProgressLastTime } from "src/progress/domain/value-objects/progress-lastTime";
import { ProgressId } from "src/progress/domain/value-objects/progress-Id";
import { UserId } from "src/user/domain/value-objects/user-id";
import { CourseId } from "src/course/domain/value-objects/course-id";

export class OrmProgressMapper implements IMapper<Progress, ProgressEntity> {

    async toOrm(domainEntity: Progress): Promise<ProgressEntity> {
        const ormProgress = ProgressEntity.create(
            domainEntity.Id.LessonId,
            domainEntity.Id.UserId,
            domainEntity.MarkAsCompleted.MarkAsCompleted,
            domainEntity.Time.Time,
            domainEntity.LastTime.LastTime
        )
        return ormProgress;
    }

    async toDomain(ormEntity: ProgressEntity): Promise<Progress> {
        const domainProgress = Progress.create(
            ProgressId.create(ormEntity.user_id, ormEntity.lesson_id),
            ProgressMarkAsCompleted.create(ormEntity.markAsCompleted),
            UserId.create(ormEntity.user_id),
            new CourseId(ormEntity.lesson.course.id),
            ProgressTime.create(ormEntity.time),
            ProgressLastTime.create(ormEntity.lastTime)
        );
        return domainProgress;
    }

}