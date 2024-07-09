import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class StartCourseProgressRequest implements ServiceRequestDto {

    constructor(
        readonly courseId: string,
        readonly userId: string
    ) {}

    dataToString(): string {
        return `StartCourseProgressReq: { userId: ${this.userId} | courseId: ${this.courseId} }`
    }

}