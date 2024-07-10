import { Entity } from "src/common/domain/entity";
import { CommentLessonBody } from "../../../comment/domain/valueObjects/lesson/comment-lesson-body";
import { LessonCommentId } from "../../../comment/domain/valueObjects/lesson/comment-lesson-id";
import { LessonCommentLessonId } from "../../../comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { CommentLessonPublicationDate } from "../../../comment/domain/valueObjects/lesson/comment-lesson-publicationDate";
import { CommentLessonUserDisliked } from "../../../comment/domain/valueObjects/lesson/comment-lesson-userDisliked";
import { CommentLessonUserId } from "../../../comment/domain/valueObjects/lesson/comment-lesson-userId";
import { CommentLessonUserLiked } from "../../../comment/domain/valueObjects/lesson/comment-lesson-userLiked";


export class CommentLesson extends Entity<LessonCommentId> {
    private publicationDate: CommentLessonPublicationDate;
    private body: CommentLessonBody;
    private userId: CommentLessonUserId;
    private lessonId: LessonCommentLessonId; 
    // private userLiked?: CommentLessonUserLiked; //Esto no es parte de la entidad, es algo calculado al momento de consultas
    // private userDisliked?: CommentLessonUserDisliked;
    
    protected constructor(
        id: LessonCommentId,
        publicationDate: CommentLessonPublicationDate,
        body: CommentLessonBody,
        userId: CommentLessonUserId,
        lessonId: LessonCommentLessonId,
        // userLiked?: CommentLessonUserLiked,
        // userDisliked?: CommentLessonUserDisliked,
    ){
        
        super(id),
        this.publicationDate = publicationDate,
        this.body = body
        this.userId = userId;
        this.lessonId = lessonId;
        // this.userDisliked = userDisliked;
        // this.userLiked = userLiked;
    }

    get PublicationDate(): CommentLessonPublicationDate {
        return this.publicationDate;
    }
    
    // get UserLiked(): CommentLessonUserLiked | undefined {
    //     return this.userLiked;
    // }
    
    // get UserDisliked(): CommentLessonUserDisliked | undefined {
    //     return this.userDisliked;
    // }
    
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
        // userLiked?: CommentLessonUserLiked,
        // userDisliked?: CommentLessonUserDisliked,
    ){
        return new CommentLesson(
            id,
            publicationDate,
            body,
            userId,
            lessonId,
            // userLiked,
            // userDisliked
        );        
    }
    

}