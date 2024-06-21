import { Entity } from "src/common/domain/entity";
import { CommentId } from "./valueObjects/comment-id";
import { CommentBlogId } from "./valueObjects/comment-blogId";
import { CommentBody } from "./valueObjects/comment-body";
import { CommentCountLike } from "./valueObjects/comment-countLikes";
import { CommentPublicationDate } from "./valueObjects/comment-publicationDate";
import { CommentUserDisliked } from "./valueObjects/comment-userDisliked";
import { CommentUserId } from "./valueObjects/comment-userId";
import { CommentUserLiked } from "./valueObjects/comment-userLiked";
import { CommentLessonId } from "./valueObjects/comment-lessonId";
import { CommentCountDislike } from "./valueObjects/comment-countDislikes";
import { AggregateRoot } from "src/common/domain/aggregate-root";


export class Comment extends AggregateRoot<CommentId> {
    private publicationDate: CommentPublicationDate;
    private body: CommentBody;
    private userId: CommentUserId;
    private blogId?: CommentBlogId;
    private lessonId?: CommentLessonId; 
    private countLikes?: CommentCountLike;
    private countDislikes?: CommentCountDislike;
    private userLiked?: CommentUserLiked;
    private userDisliked?: CommentUserDisliked;
    
    protected constructor(
        id: CommentId,
        publicationDate: CommentPublicationDate,
        body: CommentBody,
        userId: CommentUserId,
        blogId?: CommentBlogId,
        lessonId?: CommentLessonId,
        countLikes?: CommentCountLike,
        countDislikes?: CommentCountDislike,
        userLiked?: CommentUserLiked,
        userDisliked?: CommentUserDisliked,
    ){
        super(id),
        this.publicationDate = publicationDate,
        this.body = body
        this.userId = userId;
        this.blogId = blogId;
        this.lessonId = lessonId;
        this.countLikes = countLikes,
        this.countDislikes = countDislikes,
        this.userDisliked = userDisliked;
        this.userLiked = userLiked;
    }

    get PublicationDate(): CommentPublicationDate {
        return this.publicationDate;
    }

    get CountLikes(): CommentCountLike | undefined {
        return this.countLikes;
    }

    get CountDislikes(): CommentCountDislike | undefined {
        return this.countDislikes;
    }

    get UserLiked(): CommentUserLiked | undefined {
        return this.userLiked;
    }

    get UserDisliked(): CommentUserDisliked | undefined {
        return this.userDisliked;
    }

    get Body(): CommentBody {
        return this.body;
    }

    get UserId(): CommentUserId {
        return this.userId;
    }

    get LessonId(): CommentLessonId | undefined {
        return this.lessonId;
    }

    get BlogId(): CommentBlogId | undefined {
        return this.blogId;
    }

    static create (
        id: CommentId,
        publicationDate: CommentPublicationDate,
        body: CommentBody,
        userId: CommentUserId,
        blogId?: CommentBlogId,
        lessonId?: CommentLessonId,
        countLikes?: CommentCountLike,
        countDislikes?: CommentCountDislike,
        userLiked?: CommentUserLiked,
        userDisliked?: CommentUserDisliked,
    ){
        return new Comment(
            id,
            publicationDate,
            body,
            userId,
            blogId,
            lessonId,
            countLikes,
            countDislikes,
            userLiked,
            userDisliked
        );        
    }


}