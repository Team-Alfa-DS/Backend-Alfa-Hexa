import { Entity } from "src/common/domain/entity";
import { CommentLessonBody } from "./valueObjects/lesson/comment-lesson-body";
import { CommentLessonCountDislike } from "./valueObjects/lesson/comment-lesson-countDislikes";
import { CommentLessonCountLike } from "./valueObjects/lesson/comment-lesson-countLikes";
import { LessonCommentId } from "./valueObjects/lesson/comment-lesson-id";
import { LessonCommentLessonId } from "./valueObjects/lesson/comment-lesson-lessonId";
import { CommentLessonPublicationDate } from "./valueObjects/lesson/comment-lesson-publicationDate";
import { CommentLessonUserDisliked } from "./valueObjects/lesson/comment-lesson-userDisliked";
import { CommentLessonUserId } from "./valueObjects/lesson/comment-lesson-userId";
import { CommentLessonUserLiked } from "./valueObjects/lesson/comment-lesson-userLiked";


export class CommentLesson extends Entity<LessonCommentId> {
    private publicationDate: CommentLessonPublicationDate;
    private body: CommentLessonBody;
    private userId: CommentLessonUserId;
    private lessonId: LessonCommentLessonId; 
    private countLikes?: CommentLessonCountLike;
    private countDislikes?: CommentLessonCountDislike;
    private userLiked?: CommentLessonUserLiked;
    private userDisliked?: CommentLessonUserDisliked;
    
    protected constructor(
        id: LessonCommentId,
        publicationDate: CommentLessonPublicationDate,
        body: CommentLessonBody,
        userId: CommentLessonUserId,
        lessonId: LessonCommentLessonId,
        countLikes?: CommentLessonCountLike,
        countDislikes?: CommentLessonCountDislike,
        userLiked?: CommentLessonUserLiked,
        userDisliked?: CommentLessonUserDisliked,
    ){
        
        super(id),
        this.publicationDate = publicationDate,
        this.body = body
        this.userId = userId;
        this.lessonId = lessonId;
        this.countLikes = countLikes,
        this.countDislikes = countDislikes,
        this.userDisliked = userDisliked;
        this.userLiked = userLiked;
    }

    get PublicationDate(): CommentLessonPublicationDate {
        return this.publicationDate;
    }
    
    get CountLikes(): CommentLessonCountLike | undefined {
        return this.countLikes;
    }
    
    get CountDislikes(): CommentLessonCountDislike | undefined {
        return this.countDislikes;
    }
    
    get UserLiked(): CommentLessonUserLiked | undefined {
        return this.userLiked;
    }
    
    get UserDisliked(): CommentLessonUserDisliked | undefined {
        return this.userDisliked;
    }
    
    get Body(): CommentLessonBody {
        return this.body;
    }
    
    get UserId(): CommentLessonUserId {
        return this.userId;
    }
    
    get LessonId(): LessonCommentLessonId | undefined {
        return this.lessonId;
    }
    
    static create (
        id: LessonCommentId,
        publicationDate: CommentLessonPublicationDate,
        body: CommentLessonBody,
        userId: CommentLessonUserId,
        lessonId: LessonCommentLessonId,
        countLikes?: CommentLessonCountLike,
        countDislikes?: CommentLessonCountDislike,
        userLiked?: CommentLessonUserLiked,
        userDisliked?: CommentLessonUserDisliked,
    ){
        return new CommentLesson(
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