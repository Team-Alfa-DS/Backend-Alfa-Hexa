import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class GetOneProgressRequest implements ServiceRequestDto {
    
    constructor(
        readonly courseId: string,
        readonly userId: string
    ) {}

    dataToString(): string {
        return `GetOneProgressReq: { courseId: ${this.courseId} | userId: ${this.userId} }`
    }
}