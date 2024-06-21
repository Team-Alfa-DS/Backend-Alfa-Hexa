import { IMapper } from "src/common/application/mappers/mapper.interface";
import { CommentEntity } from "../entities/comment.entity";
import { Comment } from "src/comment/domain/Comment";
import { CommentId } from "src/comment/domain/valueObjects/comment-id";
import { CommentPublicationDate } from "src/comment/domain/valueObjects/comment-publicationDate";
import { CommentBody } from "src/comment/domain/valueObjects/comment-body";
import { CommentUserId } from "src/comment/domain/valueObjects/comment-userId";
import { CommentBlogId } from "src/comment/domain/valueObjects/comment-blogId";
import { CommentLessonId } from "src/comment/domain/valueObjects/comment-lessonId";
import { CommentCountLike } from "src/comment/domain/valueObjects/comment-countLikes";
import { CommentCountDislike } from "src/comment/domain/valueObjects/comment-countDislikes";
import { CommentUserLiked } from "src/comment/domain/valueObjects/comment-userLiked";
import { CommentUserDisliked } from "src/comment/domain/valueObjects/comment-userDisliked";


export class OrmCommentMapper implements IMapper<Comment,CommentEntity> {

    async toOrm(DomainEntity: Comment): Promise<CommentEntity> {
        const ormComment = CommentEntity.create(
            DomainEntity.Id.commentId,
            DomainEntity.PublicationDate.PublicationDate,
            DomainEntity.Body.Body,
            DomainEntity.UserId.UserId,
            DomainEntity.BlogId.BlogId,
            DomainEntity.LessonId.LessonId,
            DomainEntity.CountLikes.CountLike,
            DomainEntity.CountDislikes.CountDislike,
            DomainEntity.UserLiked.UserLiked,
            DomainEntity.UserDisliked.UserDisliked
        )
        return ormComment;
    }
    
    async toDomain(OrmEntity: CommentEntity): Promise<Comment> {
        const domainComment = Comment.create(
            CommentId.create(OrmEntity.Id),
            CommentPublicationDate.create(OrmEntity.PublicationDate),
            CommentBody.create(OrmEntity.Body),
            CommentUserId.create(OrmEntity.UserId),
            CommentBlogId.create(OrmEntity.BlogId),
            CommentLessonId.create(OrmEntity.LessonId),
            CommentCountLike.create(OrmEntity.CountLikes),
            CommentCountDislike.create(OrmEntity.CountDislikes),
            CommentUserLiked.create(OrmEntity.UserLiked),
            CommentUserDisliked.create(OrmEntity.UserDisliked),
        )
        return domainComment;
    }

    
}