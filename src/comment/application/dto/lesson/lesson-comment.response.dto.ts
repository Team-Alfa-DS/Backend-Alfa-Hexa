import { ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class GetLessonCommentsServiceRequestDto implements ServiceRequestDto {

    constructor(
        readonly lessonId: string,
        readonly pagination: {
            page?: number,
            perPage?: number
        },
        readonly userId?: string,
    ) {}

    dataToString(): string {
        return `GetLessonCommentRes: { lessonId: ${this.lessonId} | userId: ${this.userId} | ${JSON.stringify(this.pagination)} }`;
    }
    
}

export type LessonComment = {
    id: string,
    user: string,
    body: string,
    userLiked: boolean,
    userDisliked: boolean,
    date: Date
};

export class GetLessonCommentServiceResponseDto implements ServiceResponseDto {

    constructor(
    readonly lessonComments: LessonComment[]
    ) {}

    dataToString(): string {
        return `GetLessonCommentRes: { ${JSON.stringify(this.lessonComments)} }`
    }
}