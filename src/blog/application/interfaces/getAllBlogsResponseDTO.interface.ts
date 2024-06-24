import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export interface GeneralBlogDTO {
    id: string,
    name: string,
    image: string,
    date: Date,
    category: string,
    trainer: string
}

export class GetAllBlogsResponseDTO implements ServiceResponseDto {
    constructor(
        public blogs: GeneralBlogDTO[]
    ) {}

    dataToString(): string {
        return `Blogs: ${this.blogs}`;
    }

}