import { ServiceResponseDto } from "src/common/application/interfaces/IService";

 export interface GeneralBlogDTO {
    Id: string,
    Name: string,
    Image: string,
    Date: Date,
    Category: string,
    Trainer: string
}

export class GetAllBlogsResponseDTO implements ServiceResponseDto {
    constructor(
        public blogs: GeneralBlogDTO[]
    ) {}

    dataToString(): string {
        return `Blogs: ${this.blogs}`;
    }

}