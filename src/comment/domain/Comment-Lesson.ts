import { Entity } from "src/common/domain/entity";
import { CommentIdLesson } from "./valueObjects/lesson/comment-lesson-id";
import { CommentLessonPublicationDate } from "./valueObjects/lesson/comment-lesson-publicationDate";
import { CommentLessonBody } from "./valueObjects/lesson/comment-lesson-body";
import { CommentLessonUserId } from "./valueObjects/lesson/comment-lesson-userId";
import { CommentLessonId } from "./valueObjects/lesson/comment-lesson-lessonId";
import { CommentLessonCountLike } from "./valueObjects/lesson/comment-lesson-countLikes";
import { CommentLessonCountDislike } from "./valueObjects/lesson/comment-lesson-countDislikes";
import { CommentLessonUserLiked } from "./valueObjects/lesson/comment-lesson-userLiked";
import { CommentLessonUserDisliked } from "./valueObjects/lesson/comment-lesson-userDisliked";


export class CommentLesson extends Entity<CommentIdLesson> {
    private publicationDate: CommentLessonPublicationDate;
    private body: CommentLessonBody;
    private userId: CommentLessonUserId;
    private lessonId: CommentLessonId; 
    private countLikes?: CommentLessonCountLike;
    private countDislikes?: CommentLessonCountDislike;
    private userLiked?: CommentLessonUserLiked;
    private userDisliked?: CommentLessonUserDisliked;
    
    protected constructor(
        id: CommentIdLesson,
        publicationDate: CommentLessonPublicationDate,
        body: CommentLessonBody,
        userId: CommentLessonUserId,
        lessonId: CommentLessonId,
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

    get LessonId(): CommentLessonId {
        return this.lessonId;
    }

    static create (
        id: CommentIdLesson,
        publicationDate: CommentLessonPublicationDate,
        body: CommentLessonBody,
        userId: CommentLessonUserId,
        lessonId: CommentLessonId,
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