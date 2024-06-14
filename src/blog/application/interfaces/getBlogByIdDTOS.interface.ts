import { ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";



export class GetBlogByIdResponseDTO implements ServiceResponseDto{
    constructor(
        public Title: string,
        public Description: string,
        public Category: string,
        public Images: string[],
        public Trainer: {
            Id: string
            Name: string
        },
        public Tags: string[],
        public Date: Date,
    ) {}

    dataToString(): string {
        return `Blog: ${this}`;
    }

}

export class GetBlogByIdRequestDTO implements ServiceRequestDto {
    constructor(
        public Id: string
    ) {}
    dataToString(): string {
        return `BlogId: ${this.Id}`;
    }
}