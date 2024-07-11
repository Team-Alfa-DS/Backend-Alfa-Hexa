import { BlogCommentBlogId } from "../../../../src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlogBody } from "../../../../src/comment/domain/valueObjects/blog/comment-blog-body";
import { BlogCommentId } from "../../../../src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogPublicationDate } from "../../../../src/comment/domain/valueObjects/blog/comment-blog-publicationDate";
import { CommentBlogUserDisliked } from "../../../../src/comment/domain/valueObjects/blog/comment-blog-userDisliked";
import { CommentBlogUserId } from "../../../../src/comment/domain/valueObjects/blog/comment-blog-userId";
import { CommentBlogUserLiked } from "../../../../src/comment/domain/valueObjects/blog/comment-blog-userLiked";
import { DomainEvent } from "../../../../src/common/domain/domain-event";


export class CommentBlogPosted extends DomainEvent{
    constructor(
        public id: BlogCommentId,
        public publicationDate: CommentBlogPublicationDate,
        public body: CommentBlogBody,
        public userId: CommentBlogUserId,
        public BlogId: BlogCommentBlogId,
        //public userLiked: CommentBlogUserLiked,
        //public userDisliked: CommentBlogUserDisliked
    ){
        super();
    }
}