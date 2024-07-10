import { ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";


export class GetBlogCommentsServiceRequestDto implements ServiceRequestDto {

    constructor(
        readonly blogId: string,
        readonly pagination: {
            page?: number,
            perPage?: number
        },
        readonly userId?: string
    ) {}

    dataToString(): string {
        return `GetBlogCommentReq: { blogId: ${this.blogId} | userId: ${this.userId} | pagination: ${JSON.stringify(this.pagination)} }`
    }
    
}

export type BlogComment = {
    id: string,
    user: string,
    body: string,
    userLiked: boolean,
    userDisliked: boolean,
    date: Date
};

export class GetBlogCommentServiceResponseDto implements ServiceResponseDto {

    constructor(
    readonly blogComments: BlogComment[]
    ) {}

    dataToString(): string {
        return `GetBlogCommentRes: { ${JSON.stringify(this.blogComments)} }`
    }

}