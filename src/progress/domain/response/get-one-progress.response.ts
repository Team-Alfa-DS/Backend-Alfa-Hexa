export interface LessonProgress {
    lessonId: string;
    time?: number;
    percent: number;
}

export interface GetOneProgressResponse {
    percent: number;
    lessons: LessonProgress[];
}