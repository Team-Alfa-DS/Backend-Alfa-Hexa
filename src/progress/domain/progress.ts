export class Progress {
    private userId: string;
    private lessonId: string;
    private markAsCompleted: boolean;
    private time?: number;

    private constructor(userId: string, lessonId: string, markAsCompleted: boolean, time: number) {
        this.userId = userId;
        this.lessonId = lessonId;
        this.markAsCompleted = markAsCompleted;
        this.time = time;
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

    static create(userId: string, lessonId: string, markAsCompleted: boolean, time?: number) {
        return new Progress(userId, lessonId, markAsCompleted, time);
    }

    UpdateMarkAsCompleted(markAsCompleted: boolean): void {
        this.markAsCompleted = markAsCompleted;
    }

    UpdateTime(time: number): void {
        this.time = time;
    }
}