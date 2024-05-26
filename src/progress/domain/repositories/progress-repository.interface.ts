import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Progress } from "../progress";
import { Result } from "src/common/domain/result-handler/result";

export interface IProgressRepository {

    saveProgress(progress: Progress, runner: ITransactionHandler): Promise<Result<Progress>>;
    findProgressByUser(id: string, runner: ITransactionHandler): Promise<Result<Progress>>;
}