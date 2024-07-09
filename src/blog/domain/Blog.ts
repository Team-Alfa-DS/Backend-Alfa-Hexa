import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { BlogContent } from "./valueObjects/blogContent";
import { BlogId } from "./valueObjects/blogId";
import { BlogPublicationDate } from "./valueObjects/blogPublicationDate";
import { BlogTitle } from "./valueObjects/blogTitle";
import { BlogTag } from "./valueObjects/blogTag";
import { BlogImage } from "./valueObjects/blogImage";
import { AggregateRoot } from "src/common/domain/aggregate-root";
import { DomainEvent } from "src/common/domain/domain-event";
import { BlogCreated } from './events/blogCreated.event';
import { InvalidBlogException } from "./exceptions/invalidBlogException";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogBody } from "src/comment/domain/valueObjects/blog/comment-blog-body";
import { CommentBlogPublicationDate } from "src/comment/domain/valueObjects/blog/comment-blog-publicationDate";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlogUserId } from "src/comment/domain/valueObjects/blog/comment-blog-userId";
import { CommentBlogUserDisliked } from "src/comment/domain/valueObjects/blog/comment-blog-userDisliked";
import { CommentBlogUserLiked } from "src/comment/domain/valueObjects/blog/comment-blog-userLiked";
import { CommentBlogPosted } from "./events/comment-blog-posted.event";
import { CommentBlog } from "src/comment/domain/comment-blog";



export class Blog extends AggregateRoot<BlogId>{
    protected when(event: DomainEvent): void {
        if(event instanceof BlogCreated){
            this.title = event.title;
            this.content = event.content;
            this.publication_date = event.publication_date;
            this.comments = event.comments;
            this.category = event.category;
            this.trainer = event.trainer;
            this.tag = event.tag;
            this.images = event.images;
        }

        if (event instanceof CommentBlogPosted){
            this.comments.push(event.id);
        }
    }
    protected validateState(): void {
        if(!this.title || !this.content || !this.publication_date || !this.comments || !this.category || !this.trainer || !this.tag || !this.images){ 
            throw new InvalidBlogException('Blog is invalid')
        }
    }

    // private id: BlogId
    private title: BlogTitle
    private content: BlogContent
    private publication_date: BlogPublicationDate
    private comments: BlogCommentId[]           
    private category: CategoryId
    private trainer: TrainerId
    private tag: BlogTag
    private images: BlogImage[]

constructor(
    id: BlogId,
    title: BlogTitle,
    content: BlogContent,
    publication_date: BlogPublicationDate,
    comments: BlogCommentId[],              
    category: CategoryId,
    trainer: TrainerId, 
    tag: BlogTag,
    images: BlogImage[],
    ){
        super(id, BlogCreated.create(id, title, content, publication_date, comments, category, trainer, tag, images));
        this.title = title
        this.content = content
        this.publication_date = publication_date
        this.comments = comments
        this.category = category
        this.trainer = trainer
        this.tag = tag
        this.images =images
    }

    createComment(
        id: BlogCommentId,
        publicationDate: CommentBlogPublicationDate,
        body: CommentBlogBody,
        userId: CommentBlogUserId,
        BlogId: BlogCommentBlogId,
        userLiked: CommentBlogUserLiked,
        userDisliked: CommentBlogUserDisliked
    ){
        const comment: CommentBlog = CommentBlog.create(
            id,
            publicationDate,
            body,
            userId,
            BlogId,
            userLiked,
            userDisliked)
        return comment;
    }

    PostComment(
        id: BlogCommentId,
        publicationDate: CommentBlogPublicationDate,
        body: CommentBlogBody,
        userId: CommentBlogUserId,
        BlogId: BlogCommentBlogId,
        userLiked: CommentBlogUserLiked,
        userDisliked: CommentBlogUserDisliked
    ){
        this.apply(new CommentBlogPosted(
            id, 
            publicationDate, 
            body, 
            userId, 
            BlogId, 
            userLiked, 
            userDisliked));
    }

    get Title(): BlogTitle{
        return this.title;
    }
    get Content(): BlogContent{
        return this.content;
    }
    get Publication_date(): BlogPublicationDate{
        return this.publication_date;
    }
    get Comments(): BlogCommentId[]{
        return this.comments;
    }
    get Category(): CategoryId{
        return this.category;
    }
    get Trainer(): TrainerId{
        return this.trainer;
    }
    get Tag(): BlogTag{
        return this.tag;
    }
    get Images(): BlogImage[]{
        return this.images;
    }
}