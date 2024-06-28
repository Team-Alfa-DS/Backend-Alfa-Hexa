export class Progress {
    private userId: string;
    private lessonId: string;
    private markAsCompleted: boolean;
    private time?: number;
    private lastTime?: Date;

    private constructor(userId: string, lessonId: string, markAsCompleted: boolean, time: number, lastTime: Date) {
        this.userId = userId;
        this.lessonId = lessonId;
        this.markAsCompleted = markAsCompleted;
        this.time = time;
        this.lastTime = lastTime;
    }

    get UserId(): string {
        return this.userId;
    }

    get LessonId(): string {
        return this.lessonId;
    }

    get MarkAsCompleted(): boolean {
        return this.markAsCompleted;
    }

    get Time(): number {
        return this.time;
    }

    get LastTime(): Date {
        return this.lastTime;
    }

    static create(userId: string, lessonId: string, markAsCompleted: boolean, time?: number, lastTime?: Date) {
        return new Progress(userId, lessonId, markAsCompleted, time, lastTime);
    }

    UpdateMarkAsCompleted(markAsCompleted: boolean): void {
        this.markAsCompleted = markAsCompleted;
    }

    UpdateTime(time: number): void {
        this.time = time;
    }

    UpdateLastTime(lastTime: Date): void {
        this.lastTime = lastTime;
    }
}