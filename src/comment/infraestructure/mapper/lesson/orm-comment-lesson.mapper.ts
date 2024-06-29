import { IMapper } from "src/common/application/mappers/mapper.interface";
import { OrmLessonCommentEntity } from "../../entities/orm-entities/orm-comment.lesson.entity";
import { LessonCommentId } from "src/comment/domain/valueObjects/lesson/comment-lesson-id";
import { CommentLessonUserDisliked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userDisliked";
import { CommentLessonUserLiked } from "src/comment/domain/valueObjects/lesson/comment-lesson-userLiked";
import { CommentLessonCountDislike } from "src/comment/domain/valueObjects/lesson/comment-lesson-countDislikes";
import { CommentLessonCountLike } from "src/comment/domain/valueObjects/lesson/comment-lesson-countLikes";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { CommentLessonUserId } from "src/comment/domain/valueObjects/lesson/comment-lesson-userId";
import { CommentLessonBody } from "src/comment/domain/valueObjects/lesson/comment-lesson-body";
import { CommentLessonPublicationDate } from "src/comment/domain/valueObjects/lesson/comment-lesson-publicationDate";
import { CommentLesson } from "src/comment/domain/comment-lesson";


export class OrmLessonCommentMapper implements IMapper<CommentLesson,OrmLessonCommentEntity> {

    async toPersistence(DomainEntity: CommentLesson): Promise<OrmLessonCommentEntity> {
        const ormComment = OrmLessonCommentEntity.create(
            DomainEntity.Id.commentId,
            DomainEntity.PublicationDate.PublicationDate,
            DomainEntity.Body.Body,
            DomainEntity.UserId.UserId,
            DomainEntity.LessonId.LessonId,
            DomainEntity.CountLikes.CountLike,
            DomainEntity.CountDislikes.CountDislike,
            DomainEntity.UserLiked.UserLiked,
            DomainEntity.UserDisliked.UserDisliked
        )
        return ormComment;
    }
    
    async toDomain(OrmEntity: OrmLessonCommentEntity): Promise<CommentLesson> {
        const domainComment = CommentLesson.create(
            LessonCommentId.create(OrmEntity.Id),
            CommentLessonPublicationDate.create(OrmEntity.PublicationDate),
            CommentLessonBody.create(OrmEntity.Body),
            CommentLessonUserId.create(OrmEntity.UserId),
            LessonCommentLessonId.create(OrmEntity.LessonId),
            CommentLessonCountLike.create(OrmEntity.CountLikes),
            CommentLessonCountDislike.create(OrmEntity.CountDislikes),
            CommentLessonUserLiked.create(OrmEntity.UserLiked),
            CommentLessonUserDisliked.create(OrmEntity.UserDisliked),
        )
        return domainComment;
    }

    
}