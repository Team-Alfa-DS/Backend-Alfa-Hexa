import { ServiceRequestDto } from "src/common/application/interfaces/IService";


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
        return `GetBlogOrLessonCommentReq: { blogId: ${this.blogId} | userId: ${this.userId} | pagination: ${JSON.stringify(this.pagination)} }`
    }
    
}