import { AggregateRoot } from "src/common/domain/aggregate-root";
import { ProgressLastTime } from "./value-objects/progress-lastTime";
import { ProgressMarkAsCompleted } from "./value-objects/progress-markAsCompleted";
import { ProgressTime } from "./value-objects/progress-time";
import { ProgressId } from "./value-objects/progress-Id";

export class Progress extends AggregateRoot<ProgressId>{
    private markAsCompleted: ProgressMarkAsCompleted;
    private time?: ProgressTime;
    private lastTime?: ProgressLastTime;

    private constructor(id: ProgressId, markAsCompleted: ProgressMarkAsCompleted, time: ProgressTime, lastTime: ProgressLastTime) {
        super(id);
        this.markAsCompleted = markAsCompleted;
        this.time = time;
        this.lastTime = lastTime;
    }

    get MarkAsCompleted(): ProgressMarkAsCompleted {
        return this.markAsCompleted;
    }

    get Time(): ProgressTime {
        return this.time;
    }

    get LastTime(): ProgressLastTime {
        return this.lastTime;
    }

    static create(id: ProgressId, markAsCompleted: ProgressMarkAsCompleted, time?: ProgressTime, lastTime?: ProgressLastTime) {
        return new Progress(id, markAsCompleted, time, lastTime);
    }

    UpdateMarkAsCompleted(markAsCompleted: ProgressMarkAsCompleted): void {
        this.markAsCompleted = markAsCompleted;
    }

    UpdateTime(time: ProgressTime): void {
        this.time = time;
    }

    UpdateLastTime(lastTime: ProgressLastTime): void {
        this.lastTime = lastTime;
    }
}