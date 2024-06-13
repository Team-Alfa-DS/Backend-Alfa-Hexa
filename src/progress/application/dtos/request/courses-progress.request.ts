import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class CoursesProgressRequest implements ServiceRequestDto {

    constructor(
        readonly userId: string,
        readonly page?: number,
        readonly perpage?: number
    ) {}

    dataToString(): string {
        return `CoursesProgressReq: { userId: ${this.userId} | page: ${this.page} | perpage: ${this.perpage} }`
    }
    
}