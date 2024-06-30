import { CommentBlog } from "src/comment/domain/comment-blog";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { OrmBlogCommentEntity } from "../../entities/orm-entities/orm-comment.blog.entity";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogPublicationDate } from "src/comment/domain/valueObjects/blog/comment-blog-publicationDate";
import { CommentBlogUserId } from "src/comment/domain/valueObjects/blog/comment-blog-userId";
import { CommentBlogBody } from "src/comment/domain/valueObjects/blog/comment-blog-body";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlogUserDisliked } from "src/comment/domain/valueObjects/blog/comment-blog-userDisliked";
import { CommentBlogUserLiked } from "src/comment/domain/valueObjects/blog/comment-blog-userLiked";
import { CommentBlogCountLike } from "src/comment/domain/valueObjects/blog/comment-blog-countLikes";
import { CommentBlogCountDislike } from "src/comment/domain/valueObjects/blog/comment-blog-countDislikes";
import { BlogId } from "src/blog/domain/valueObjects/blogId";


export class OrmBlogCommentMapper implements IMapper<CommentBlog,OrmBlogCommentEntity> {

    async toPersistence(DomainEntity: CommentBlog): Promise<OrmBlogCommentEntity> {
        const ormComment = OrmBlogCommentEntity.create(
            DomainEntity.Id.commentId,
            DomainEntity.PublicationDate.PublicationDate,
            DomainEntity.Body.Body,
            DomainEntity.UserId.UserId,
            DomainEntity.BlogId.BlogId.value,
            DomainEntity.CountLikes.CountLike,
            DomainEntity.CountDislikes.CountDislike,
            DomainEntity.UserLiked.UserLiked,
            DomainEntity.UserDisliked.UserDisliked
        )
        return ormComment;
    }
    
    async toDomain(OrmEntity: OrmBlogCommentEntity): Promise<CommentBlog> {
        const domainComment = CommentBlog.create(
            BlogCommentId.create(OrmEntity.Id),
            CommentBlogPublicationDate.create(OrmEntity.PublicationDate),
            CommentBlogBody.create(OrmEntity.Body),
            CommentBlogUserId.create(OrmEntity.UserId),
            BlogCommentBlogId.create(BlogId.create(OrmEntity.BlogId)),
            CommentBlogCountLike.create(OrmEntity.CountLikes),
            CommentBlogCountDislike.create(OrmEntity.CountDislikes),
            CommentBlogUserLiked.create(OrmEntity.UserLiked),
            CommentBlogUserDisliked.create(OrmEntity.UserDisliked),
        )
        return domainComment;
    }

    
}