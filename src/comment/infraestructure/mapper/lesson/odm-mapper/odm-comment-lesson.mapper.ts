import { LessonCommentId } from "src/comment/domain/valueObjects/lesson/comment-lesson-id";
import { CommentLessonUserDisliked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userDisliked";
import { CommentLessonUserLiked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userLiked";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { CommentLessonUserId } from "src/comment/domain/valueObjects/lesson/comment-lesson-userId";
import { CommentLessonBody } from "src/comment/domain/valueObjects/lesson/comment-lesson-body";
import { CommentLessonPublicationDate } from "src/comment/domain/valueObjects/lesson/comment-lesson-publicationDate";
import { CommentLesson } from "src/comment/domain/comment-lesson";
import { OdmLessonCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.lesson.entity";
import { LessonId } from "src/course/domain/value-objects/lesson-id";


export class OdmLessonCommentMapper  {

    async toDomain(OdmEntity: OdmLessonCommentEntity): Promise<CommentLesson> {
        const domainComment = CommentLesson.create(
            LessonCommentId.create(OdmEntity.id),
            CommentLessonPublicationDate.create(OdmEntity.publication_date),
            CommentLessonBody.create(OdmEntity.body),
            CommentLessonUserId.create(OdmEntity.user.id),
            LessonCommentLessonId.create(LessonId.create(OdmEntity.lesson.id)),
            CommentLessonUserLiked.create(OdmEntity.userLiked),
            CommentLessonUserDisliked.create(OdmEntity.userDisliked),
        )
        return domainComment;
    }

    
}