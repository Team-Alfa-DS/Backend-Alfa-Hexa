import { CommentBlogPosted } from "src/blog/domain/events/comment-blog-posted.event";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { CommentBlog } from "src/comment/domain/comment-blog";
import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";

export class CreateCommentBlogEvent implements IEventSubscriber<CommentBlogPosted> {

    constructor(private odmBlogRepository: IBlogRepository) {}

    async on(event: CommentBlogPosted): Promise<void> {
        const comment = CommentBlog.create(
            event.id, 
            event.publicationDate, 
            event.body, 
            event.userId,
            event.BlogId,
            // event.userLiked,
            // event.userDisliked
        );
        this.odmBlogRepository.saveComment(comment);
    }
}