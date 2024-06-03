import { IMapper } from "src/common/application/mappers/mapper.interface";
import { Progress } from "src/progress/domain/progress";
import { ProgressEntity } from "../entities/progress.entity";

export class OrmProgressMapper implements IMapper<Progress, ProgressEntity> {

    async toOrm(domainEntity: Progress): Promise<ProgressEntity> {
        const ormProgress = ProgressEntity.create(
            domainEntity.LessonId,
            domainEntity.UserId,
            domainEntity.MarkAsCompleted,
            domainEntity.Time
        )
        return ormProgress;
    }

    async toDomain(ormEntity: ProgressEntity): Promise<Progress> {
        const domainProgress = Progress.create(
            ormEntity.user_id,
            ormEntity.lesson_id,
            ormEntity.markAsCompleted,
            ormEntity.time
        )
        return domainProgress;
    }

}