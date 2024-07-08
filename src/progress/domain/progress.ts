import { AggregateRoot } from "src/common/domain/aggregate-root";
import { ProgressLastTime } from "./value-objects/progress-lastTime";
import { ProgressMarkAsCompleted } from "./value-objects/progress-markAsCompleted";
import { ProgressTime } from "./value-objects/progress-time";
import { ProgressId } from "./value-objects/progress-Id";
import { UserId } from "src/user/domain/value-objects/user-id";
import { DomainEvent } from "src/common/domain/domain-event";
import { ProgressCreated } from "./events/progress-created.event";
import { InvalidProgressException } from "./exceptions/invalid-progress.exception";
import { ProgressMarkAsCompletedUpdated } from "./events/progress-markAsCompleted-updated.event";
import { ProgressTimeUpdated } from "./events/progress-time-updated.event";
import { ProgressLastTimeUpdated } from "./events/progress-lastTime-updated.event";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { ProgressRegister } from "./events/progress-register.event";

export class Progress extends AggregateRoot<ProgressId>{
    private markAsCompleted: ProgressMarkAsCompleted;
    private time: ProgressTime;
    private lastTime: ProgressLastTime;
    private user: UserId;
    private course: CourseId;

    private constructor(id: ProgressId, markAsCompleted: ProgressMarkAsCompleted, user: UserId, course: CourseId, time: ProgressTime, lastTime: ProgressLastTime) {
        const progressCreated = ProgressCreated.create(id, markAsCompleted, user, course, time, lastTime);
        super(id, progressCreated);
    }

    protected when(event: DomainEvent): void {
        if (event instanceof ProgressCreated) {
            this.markAsCompleted = event.markAsCompleted;
            this.time = event.time;
            this.lastTime = event.lastTime;
            this.user = event.user;
        }

        if (event instanceof ProgressMarkAsCompletedUpdated) {
            this.markAsCompleted = event.markAsCompleted;
        }

        if (event instanceof ProgressTimeUpdated) {
            this.time = event.time;
        }

        if (event instanceof ProgressLastTimeUpdated) {
            this.lastTime = event.lastTime;
        }
    }

    protected validateState(): void {
        if (!this.course || !this.user) throw new InvalidProgressException('El progreso no es valido');
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

    get Course(): CourseId {
        return this.course;
    }

    static create(id: ProgressId, markAsCompleted: ProgressMarkAsCompleted, user: UserId, course: CourseId, time: ProgressTime, lastTime: ProgressLastTime) {
        return new Progress(id, markAsCompleted, user, course, time, lastTime);
    }

    UpdateMarkAsCompleted(markAsCompleted: ProgressMarkAsCompleted): void {
        this.apply(ProgressMarkAsCompletedUpdated.create(this.Id, markAsCompleted));
    }

    UpdateTime(time: ProgressTime): void {
        this.apply(ProgressTimeUpdated.create(this.Id, time));
    }

    UpdateLastTime(lastTime: ProgressLastTime): void {
        this.apply(ProgressLastTimeUpdated.create(this.Id, lastTime));
    }

    Register() {
        this.apply(ProgressRegister.create(this.Id, this.MarkAsCompleted, this.User, this.Course, this.Time, this.LastTime));
    }
}