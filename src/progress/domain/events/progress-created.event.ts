import { DomainEvent } from "src/common/domain/domain-event"
import { ProgressId } from "../value-objects/progress-Id";
import { ProgressMarkAsCompleted } from "../value-objects/progress-markAsCompleted";
import { UserId } from "src/user/domain/value-objects/user-id";
import { ProgressTime } from "../value-objects/progress-time";
import { ProgressLastTime } from "../value-objects/progress-lastTime";
import { CourseId } from "src/course/domain/value-objects/course-id";

export class ProgressCreated extends DomainEvent {

    protected constructor(
        public id: ProgressId, 
        public markAsCompleted: ProgressMarkAsCompleted, 
        public user: UserId,
        public course: CourseId,
        public time: ProgressTime, 
        public lastTime: ProgressLastTime
    ) {
        super();
    }

    static create(
        id: ProgressId, 
        markAsCompleted: ProgressMarkAsCompleted, 
        user: UserId,
        course: CourseId,
        time: ProgressTime, 
        lastTime: ProgressLastTime
    ): ProgressCreated {
        return new ProgressCreated(id, markAsCompleted, user, course, time, lastTime);
    }
}