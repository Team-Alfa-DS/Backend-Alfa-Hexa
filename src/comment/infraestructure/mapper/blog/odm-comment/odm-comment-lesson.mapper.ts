import { CommentBlog } from "src/comment/domain/comment-blog";
import { OdmBlogCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.blog.entity";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogPublicationDate } from "src/comment/domain/valueObjects/blog/comment-blog-publicationDate";
import { CommentBlogBody } from "src/comment/domain/valueObjects/blog/comment-blog-body";
import { CommentBlogUserId } from "src/comment/domain/valueObjects/blog/comment-blog-userId";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlogUserLiked } from "src/comment/domain/valueObjects/blog/comment-blog-userLiked";
import { CommentBlogUserDisliked } from "src/comment/domain/valueObjects/blog/comment-blog-userDisliked";
import { BlogId } from "src/blog/domain/valueObjects/blogId";


export class OdmBlogCommentMapper  {

    async toDomain(OdmEntity: OdmBlogCommentEntity): Promise<CommentBlog> {
        const domainComment = CommentBlog.create(
            BlogCommentId.create(OdmEntity.id),
            CommentBlogPublicationDate.create(OdmEntity.publication_date),
            CommentBlogBody.create(OdmEntity.body),
            CommentBlogUserId.create(OdmEntity.user.id),
            BlogCommentBlogId.create(BlogId.create(OdmEntity.blog.id)),
            CommentBlogUserLiked.create(OdmEntity.userLiked),
            CommentBlogUserDisliked.create(OdmEntity.userDisliked),
        )
        return domainComment;
    }

    
}