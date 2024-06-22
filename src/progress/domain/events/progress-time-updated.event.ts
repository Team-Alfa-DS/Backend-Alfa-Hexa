import { DomainEvent } from "src/common/domain/domain-event";
import { ProgressId } from "../value-objects/progress-Id";
import { ProgressTime } from "../value-objects/progress-time";

export class ProgressTimeUpdated extends DomainEvent {

    protected constructor(
        public id: ProgressId,
        public time: ProgressTime
    ) {
        super();
    }

    static create(
        id: ProgressId,
        time: ProgressTime
    ): ProgressTimeUpdated {
        return new ProgressTimeUpdated(id, time);
    }
}