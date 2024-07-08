import { CommentLessonBody } from "src/comment/domain/valueObjects/lesson/comment-lesson-body";
import { LessonCommentId } from "src/comment/domain/valueObjects/lesson/comment-lesson-id";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { CommentLessonPublicationDate } from "src/comment/domain/valueObjects/lesson/comment-lesson-publicationDate";
import { CommentLessonUserDisliked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userDisliked";
import { CommentLessonUserId } from "src/comment/domain/valueObjects/lesson/comment-lesson-userId";
import { CommentLessonUserLiked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userLiked";
import { DomainEvent } from "src/common/domain/domain-event";

export class CommentPosted extends DomainEvent {

constructor(
    public id: LessonCommentId,
    public publicationDate: CommentLessonPublicationDate,
    public body: CommentLessonBody,
    public userId: CommentLessonUserId,
    public LessonId: LessonCommentLessonId,
    public userLiked: CommentLessonUserLiked,
    public userDisliked: CommentLessonUserDisliked
    ) {super()}
}