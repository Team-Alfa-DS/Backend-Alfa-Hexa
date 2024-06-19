import { IMapper } from "src/common/application/mappers/mapper.interface";
import { CommentEntity } from "../entities/comment.entity";
import { Comment } from "src/comment/domain/Comment";


export class OrmCommentMapper implements IMapper<Comment,CommentEntity> {

    async toOrm(DomainEntity: Comment): Promise<CommentEntity> {
        const ormComment = CommentEntity.create(
            DomainEntity.Id,
            DomainEntity.PublicationDate,
            DomainEntity.Body,
            DomainEntity.UserId,
            DomainEntity.BlogId,
            DomainEntity.LessonId,
            DomainEntity.CountLikes,
            DomainEntity.CountDislikes,
            DomainEntity.UserLiked,
            DomainEntity.UserDisliked
        )
        return ormComment;
    }
    
    async toDomain(OrmEntity: CommentEntity): Promise<Comment> {
        const domainComment = Comment.create(
            OrmEntity.Id,
            OrmEntity.PublicationDate,
            OrmEntity.Body,
            OrmEntity.UserId,
            OrmEntity.BlogId,
            OrmEntity.LessonId,
            OrmEntity.CountLikes,
            OrmEntity.CountDislikes,
            OrmEntity.UserLiked,
            OrmEntity.UserDisliked,
        )
        return domainComment;
    }

    
}