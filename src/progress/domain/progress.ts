import { AggregateRoot } from "src/common/domain/aggregate-root";
import { ProgressLastTime } from "./value-objects/progress-lastTime";
import { ProgressMarkAsCompleted } from "./value-objects/progress-markAsCompleted";
import { ProgressTime } from "./value-objects/progress-time";
import { ProgressId } from "./value-objects/progress-Id";
import { UserId } from "src/user/domain/value-objects/user-id";

export class Progress extends AggregateRoot<ProgressId>{
    private markAsCompleted: ProgressMarkAsCompleted;
    private time?: ProgressTime;
    private lastTime?: ProgressLastTime;
    private user: UserId;

    private constructor(id: ProgressId, markAsCompleted: ProgressMarkAsCompleted, user: UserId, time: ProgressTime, lastTime: ProgressLastTime) {
        super(id);
        this.markAsCompleted = markAsCompleted;
        this.time = time;
        this.lastTime = lastTime;
        this.user = user;
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

    get User(): UserId {
        return this.user;
    }

    static create(id: ProgressId, markAsCompleted: ProgressMarkAsCompleted, user: UserId, time?: ProgressTime, lastTime?: ProgressLastTime) {
        return new Progress(id, markAsCompleted, user, time, lastTime);
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