import { ProgressLastTime } from "./value-objects/progress-lastTime";
import { ProgressLessonId } from "./value-objects/progress-lessonId";
import { ProgressMarkAsCompleted } from "./value-objects/progress-markAsCompleted";
import { ProgressTime } from "./value-objects/progress-time";
import { ProgressUserId } from "./value-objects/progress-userId";

export class Progress {
    private userId: ProgressUserId;
    private lessonId: ProgressLessonId;
    private markAsCompleted: ProgressMarkAsCompleted;
    private time?: ProgressTime;
    private lastTime?: ProgressLastTime;

    private constructor(userId: ProgressUserId, lessonId: ProgressLessonId, markAsCompleted: ProgressMarkAsCompleted, time: ProgressTime, lastTime: ProgressLastTime) {
        this.userId = userId;
        this.lessonId = lessonId;
        this.markAsCompleted = markAsCompleted;
        this.time = time;
        this.lastTime = lastTime;
    }

    get UserId(): ProgressUserId {
        return this.userId;
    }

    get LessonId(): ProgressLessonId {
        return this.lessonId;
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

    static create(userId: ProgressUserId, lessonId: ProgressLessonId, markAsCompleted: ProgressMarkAsCompleted, time?: ProgressTime, lastTime?: ProgressLastTime) {
        return new Progress(userId, lessonId, markAsCompleted, time, lastTime);
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