import { ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";



export class GetBlogByIdResponseDTO implements ServiceResponseDto{
    constructor(
        public title: string,
        public description: string,
        public category: string,
        public images: string[],
        public trainer: {
            id: string
            name: string
        },
        public tag: string,
        public date: Date,
    ) {}

    dataToString(): string {
        return `Blog: ${this}`;
    }

}

export class GetBlogByIdRequestDTO implements ServiceRequestDto {
    constructor(
        public id: string
    ) {}
    dataToString(): string {
        return `BlogId: ${this.id}`;
    }
}