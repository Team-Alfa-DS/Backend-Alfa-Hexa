import { DomainEvent } from "src/common/domain/domain-event";
import { CommentId } from "../valueObjects/comment-lesson-id";
import { CommentBlogId } from "../valueObjects/comment-lesson-blogId";
import { CommentBody } from "../valueObjects/comment-lesson-body";
import { CommentCountDislike } from "../valueObjects/comment-lesson-countDislikes";
import { CommentCountLike } from "../valueObjects/comment-lesson-countLikes";
import { CommentPublicationDate } from "../valueObjects/comment-lesson-publicationDate";
import { CommentUserDisliked } from "../valueObjects/comment-lesson-userDisliked";
import { CommentUserId } from "../valueObjects/comment-lesson-userId";
import { CommentUserLiked } from "../valueObjects/comment-lesson-userLiked";


export class CommentBlogCreated extends DomainEvent{
    
    constructor(
        id: CommentId,
        publicationDate: CommentPublicationDate,
        body: CommentBody,
        userId: CommentUserId,
        blogId: CommentBlogId,
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
        blogId: CommentBlogId,
        countLikes?: CommentCountLike,
        countDislikes?: CommentCountDislike,
        userLiked?: CommentUserLiked,
        userDisliked?: CommentUserDisliked,
    ){
        return new CommentBlogCreated(
            id,
            publicationDate,
            body,
            userId,
            blogId,
            countLikes,
            countDislikes,
            userLiked,
            userDisliked
        );        
    }
}