import { DomainEvent } from "src/common/domain/domain-event";
import { ProgressId } from "../value-objects/progress-Id";
import { ProgressMarkAsCompleted } from "../value-objects/progress-markAsCompleted";

export class ProgressMarkAsCompletedUpdated extends DomainEvent {

    protected constructor(
        public id: ProgressId,
        public markAsCompleted: ProgressMarkAsCompleted
    ) {
        super();
    }

    static create(
        id: ProgressId,
        markAsCompleted: ProgressMarkAsCompleted
    ): ProgressMarkAsCompletedUpdated {
        return new ProgressMarkAsCompletedUpdated(id, markAsCompleted);
    }
}