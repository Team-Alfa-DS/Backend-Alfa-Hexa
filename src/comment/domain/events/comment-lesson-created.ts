import { DomainEvent } from "src/common/domain/domain-event";
import { CommentBody } from "../valueObjects/comment-lesson-body";
import { CommentCountDislike } from "../valueObjects/comment-lesson-countDislikes";
import { CommentCountLike } from "../valueObjects/comment-lesson-countLikes";
import { CommentId } from "../valueObjects/comment-lesson-id";
import { CommentLessonId } from "../valueObjects/comment-lesson-lessonId";
import { CommentPublicationDate } from "../valueObjects/comment-lesson-publicationDate";
import { CommentUserDisliked } from "../valueObjects/comment-lesson-userDisliked";
import { CommentUserId } from "../valueObjects/comment-lesson-userId";
import { CommentUserLiked } from "../valueObjects/comment-lesson-userLiked";


export class CommentLessonCreated extends DomainEvent{
    
    constructor(
        id: CommentId,
        publicationDate: CommentPublicationDate,
        body: CommentBody,
        userId: CommentUserId,
        lessonId?: CommentLessonId,
        countLikes?: CommentCountLike,
        countDislikes?: CommentCountDislike,
        userLiked?: CommentUserLiked,
        userDisliked?: CommentUserDisliked,
    )
    {
        super();
    }

    static create (
        id: CommentId,
        publicationDate: CommentPublicationDate,
        body: CommentBody,
        userId: CommentUserId,
        lessonId: CommentLessonId,
        countLikes?: CommentCountLike,
        countDislikes?: CommentCountDislike,
        userLiked?: CommentUserLiked,
        userDisliked?: CommentUserDisliked,
    ){
        return new CommentLessonCreated(
            id,
            publicationDate,
            body,
            userId,
            lessonId,
            countLikes,
            countDislikes,
            userLiked,
            userDisliked
        );        
    }

}