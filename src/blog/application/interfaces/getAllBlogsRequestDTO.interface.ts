import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class GetAllBlogsRequestDTO implements ServiceRequestDto {
    constructor() {}

    dataToString(): string {
        return `Blogs: { }`;
    }

}