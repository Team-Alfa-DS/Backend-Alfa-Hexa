import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Comment } from "src/comment/domain/Comment";
import { CommentBlogId } from "../valueObjects/comment-blogId";
import { CommentLessonId } from "../valueObjects/comment-lessonId";


export interface ICommentRepository {
    findAllCommentsByBlogId(id: CommentBlogId, runner: ITransactionHandler): Promise<Result<Comment[]>>;
    findAllCommentsByLessonId(id: CommentLessonId, runner: ITransactionHandler): Promise<Result<Comment[]>>;
    saveComment(comment: Comment, runner: ITransactionHandler): Promise<Result<Comment>>;
}