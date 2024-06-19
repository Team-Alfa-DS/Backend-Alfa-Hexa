import { Entity } from "src/common/domain/entity";
import { CommentIdBlog } from "./valueObjects/blog/comment-blog-id";
import { CommentBlogPublicationDate } from "./valueObjects/blog/comment-blog-publicationDate";
import { CommentBlogBody } from "./valueObjects/blog/comment-blog-body";
import { CommentBlogUserId } from "./valueObjects/blog/comment-blog-userId";
import { CommentBlogId } from "./valueObjects/blog/comment-blog-blogId";
import { CommentBlogCountLike } from "./valueObjects/blog/comment-blog-countLikes";
import { CommentBlogCountDislike } from "./valueObjects/blog/comment-blog-countDislikes";
import { CommentBlogUserLiked } from "./valueObjects/blog/comment-blog-userLiked";
import { CommentBlogUserDisliked } from "./valueObjects/blog/comment-blog-userDisliked";


export class CommentBlog extends Entity<CommentIdBlog> {
    private publicationDate: CommentBlogPublicationDate;
    private body: CommentBlogBody;
    private userId: CommentBlogUserId;
    private blogId: CommentBlogId; 
    private countLikes?: CommentBlogCountLike;
    private countDislikes?: CommentBlogCountDislike;
    private userLiked?: CommentBlogUserLiked;
    private userDisliked?: CommentBlogUserDisliked;
    
    protected constructor(
        id: CommentIdBlog,
        publicationDate: CommentBlogPublicationDate,
        body: CommentBlogBody,
        userId: CommentBlogUserId,
        blogId: CommentBlogId,
        countLikes?: CommentBlogCountLike,
        countDislikes?: CommentBlogCountDislike,
        userLiked?: CommentBlogUserLiked,
        userDisliked?: CommentBlogUserDisliked,
    ){
        super(id),
        this.publicationDate = publicationDate,
        this.body = body
        this.userId = userId;
        this.blogId = blogId;
        this.countLikes = countLikes,
        this.countDislikes = countDislikes,
        this.userDisliked = userDisliked;
        this.userLiked = userLiked;
    }

    get PublicationDate(): CommentBlogPublicationDate {
        return this.publicationDate;
    }

    get CountLikes(): CommentBlogCountLike | undefined {
        return this.countLikes;
    }

    get CountDislikes(): CommentBlogCountDislike | undefined {
        return this.countDislikes;
    }

    get UserLiked(): CommentBlogUserLiked | undefined {
        return this.userLiked;
    }

    get UserDisliked(): CommentBlogUserDisliked | undefined {
        return this.userDisliked;
    }

    get Body(): CommentBlogBody {
        return this.body;
    }

    get UserId(): CommentBlogUserId {
        return this.userId;
    }

    get BlogId(): CommentBlogId {
        return this.blogId;
    }

    static create (
        id: CommentIdBlog,
        publicationDate: CommentBlogPublicationDate,
        body: CommentBlogBody,
        userId: CommentBlogUserId,
        blogId: CommentBlogId,
        countLikes?: CommentBlogCountLike,
        countDislikes?: CommentBlogCountDislike,
        userLiked?: CommentBlogUserLiked,
        userDisliked?: CommentBlogUserDisliked,
    ){
        return new CommentBlog(
            id,
            publicationDate,
            body,
            userId,
            blogId,
            countLikes,
            countDislikes,
            userLiked,
            userDisliked
        );        
    }


}