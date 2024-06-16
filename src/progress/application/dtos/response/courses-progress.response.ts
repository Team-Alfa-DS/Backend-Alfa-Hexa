import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export type CourseProgress = {
        id: string,
        title: string,
        image: string,
        date: Date,
        category: string,
        trainer: string,
        percent: number
}

export class CoursesProgressResponse implements ServiceResponseDto {

    constructor(
        readonly courseProgress: CourseProgress[]
    ) {}

    dataToString(): string {
        return `CoursesProgressRes: { courseProgress: ${JSON.stringify(this.courseProgress)} }`
    }
    
}