import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Comment } from "src/comment/domain/Comment";


export interface ICommentRepository {
    findAllCommentsByBlogId(id: string, runner: ITransactionHandler): Promise<Result<Comment[]>>;
    findAllCommentsByLessonId(id: string, runner: ITransactionHandler): Promise<Result<Comment[]>>;
    saveComment(comment: Comment, runner: ITransactionHandler): Promise<Result<Comment>>;
}