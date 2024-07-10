import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class StartCourseProgressResponse implements ServiceResponseDto {

    constructor(
    ) {}

    dataToString(): string {
        return `StartCourseProgressRes: {  }`
    }

}