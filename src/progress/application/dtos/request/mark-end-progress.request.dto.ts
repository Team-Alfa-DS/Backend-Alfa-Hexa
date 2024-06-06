export class MarkEndProgressDto {
    courseId: string;
    lessonId: string;
    userId: string;
    markAsCompleted: boolean;
    time?: number //segundos
}