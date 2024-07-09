import { ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class AddCommentToServiceRequestDto implements ServiceRequestDto {

    constructor(
    readonly targetId: string,
    readonly userId: string,
    readonly body: string
    ) {}

    dataToString(): string {
        return `RegisterBlogOrLessonCommentReq: { targetId: ${this.targetId} | userId: ${this.userId} | body: ${this.body} }`
    }

}

export class AddCommentToServiceResponseDto implements ServiceResponseDto {

    constructor(
        readonly registeredCommentId: string
    ) {}

    dataToString(): string {
        return `RegisterBlogOrLessonCommentRes: ${JSON.stringify(this)}`
    }

}