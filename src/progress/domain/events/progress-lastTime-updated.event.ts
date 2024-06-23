import { DomainEvent } from "src/common/domain/domain-event";
import { ProgressId } from "../value-objects/progress-Id";
import { ProgressLastTime } from "../value-objects/progress-lastTime";

export class ProgressLastTimeUpdated extends DomainEvent {

    protected constructor(
        public id: ProgressId,
        public lastTime: ProgressLastTime
    ) {
        super();
    }

    static create(
        id: ProgressId,
        lastTime: ProgressLastTime
    ): ProgressLastTimeUpdated {
        return new ProgressLastTimeUpdated(id, lastTime);
    }
}