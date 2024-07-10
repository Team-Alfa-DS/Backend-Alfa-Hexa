import { IMapper } from "src/common/application/mappers/mapper.interface";
import { LessonCommentId } from "src/comment/domain/valueObjects/lesson/comment-lesson-id";
import { CommentLessonUserDisliked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userDisliked";
import { CommentLessonUserLiked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userLiked";
import { CommentLessonCountDislike } from "src/comment/domain/valueObjects/lesson/comment-lesson-countDislikes";
import { CommentLessonCountLike } from "src/comment/domain/valueObjects/lesson/comment-lesson-countLikes";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { CommentLessonUserId } from "src/comment/domain/valueObjects/lesson/comment-lesson-userId";
import { CommentLessonBody } from "src/comment/domain/valueObjects/lesson/comment-lesson-body";
import { CommentLessonPublicationDate } from "src/comment/domain/valueObjects/lesson/comment-lesson-publicationDate";
import { OrmLessonCommentEntity } from "src/comment/infraestructure/entities/orm-entities/orm-comment.lesson.entity";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { CommentLesson } from "src/course/domain/entities/comment-lesson";


export class OrmLessonCommentMapper {

    static toPersistence(DomainEntity: CommentLesson): OrmLessonCommentEntity {
        const ormComment = OrmLessonCommentEntity.create(
            DomainEntity.Id.commentId,
            DomainEntity.PublicationDate.PublicationDate,
            DomainEntity.Body.Body,
            DomainEntity.UserId.UserId,
            DomainEntity.LessonId.LessonId.Value,
            // DomainEntity.UserLiked.UserLiked,
            // DomainEntity.UserDisliked.UserDisliked
        )
        return ormComment;
    }
    
    static toDomain(OrmEntity: OrmLessonCommentEntity): CommentLesson {
        const domainComment = CommentLesson.create(
            LessonCommentId.create(OrmEntity.Id),
            CommentLessonPublicationDate.create(OrmEntity.PublicationDate),
            CommentLessonBody.create(OrmEntity.Body),
            CommentLessonUserId.create(OrmEntity.UserId),
            LessonCommentLessonId.create(LessonId.create(OrmEntity.LessonId)),
            // CommentLessonUserLiked.create(OrmEntity.UserLiked),
            // CommentLessonUserDisliked.create(OrmEntity.UserDisliked),
        )
        return domainComment;
    }

    static arrayToDomain(entities: OrmLessonCommentEntity[]): CommentLesson[] {
        const comments: CommentLesson[] = [];
        for (let ormComment of entities) {
            comments.push( OrmLessonCommentMapper.toDomain(ormComment));
        }
        return comments;
    }
}