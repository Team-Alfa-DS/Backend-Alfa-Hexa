import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { BlogCommentBlogId } from "../../valueObjects/blog/comment-blog-blogId";
import { CommentBlog } from "../../comment-blog";

export interface IBlogCommentRepository {
    findAllCommentsByBlogId(id: BlogCommentBlogId, runner: ITransactionHandler): Promise<Result<CommentBlog[]>>;
    saveComment(comment: CommentBlog, runner: ITransactionHandler): Promise<Result<CommentBlog>>;
}