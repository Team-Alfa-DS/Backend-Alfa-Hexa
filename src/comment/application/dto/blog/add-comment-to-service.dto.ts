import { ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class AddCommentToServiceRequestDto implements ServiceRequestDto {

    constructor(
    readonly targetId: string,
    readonly userId: string,
    readonly body: string
    ) {}

    dataToString(): string {
        return `RegisterBlogOrLessonCommentReq: { blogId: ${this.targetId} | userId: ${this.userId} | body: ${this.body} }`
    }

}

export class AddCommentToServiceResponseDto implements ServiceResponseDto {

    constructor(
    readonly id: string,
    readonly user: string,
    readonly body: string,
    readonly countLikes: number,
    readonly countDislikes: number,
    readonly userLiked: boolean,
    readonly userDisliked: boolean,
    readonly date: Date
    ) {}

    dataToString(): string {
        return `RegisterBlogOrLessonCommentRes: { id: ${this.id} | userId: ${this.user} | body: ${this.body} | countLikes: ${this.countLikes} | countDislikes: ${this.countDislikes} | userLiked: ${this.userLiked} | userDisliked: ${this.userDisliked} | date: ${this.date} }`
    }

}