import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class MarkEndProgressRequest implements ServiceRequestDto {
    constructor(
        readonly courseId: string,
        readonly lessonId: string,
        readonly userId: string,
        readonly markAsCompleted: boolean,
        readonly time?: number //segundos
    ) {}

    dataToString(): string {
        return `MarkEndProgressReq: { courseId: ${this.courseId} | lessonId: ${this.lessonId} | userId: ${this.userId} | markAsCompleted: ${this.markAsCompleted} | time: ${this.time} }`
    }
}