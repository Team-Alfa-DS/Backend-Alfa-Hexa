import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";


export interface ICommentRepository {
    findAllComments(id: string, runner: ITransactionHandler): Promise<Result<Comment[]>>;
    saveComment(comment: Comment, runner: ITransactionHandler): Promise<Result<Comment>>
}