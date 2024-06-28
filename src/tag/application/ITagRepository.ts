import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export interface ITagRepository {
    getAllTags(runner: ITransactionHandler): Promise<Result<string[]>>;
}