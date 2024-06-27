export interface LessonProgress {
    lessonId: string;
    time: number;
    percent: number;
}

export interface CalcPercentProgressResponse {
    percent: number;
    lessons: LessonProgress[];
}