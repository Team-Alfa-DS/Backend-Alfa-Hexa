import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Progress } from "../progress";
import { Result } from "src/common/domain/result-handler/result";
import { Lesson } from "src/course/domain/Lesson";

export interface IProgressRepository {

    saveProgress(progress: Progress, runner: ITransactionHandler): Promise<Result<Progress>>;
    findProgressByUserCourse(userId: string, lessons: Lesson[], runner: ITransactionHandler): Promise<Result<Progress[]>>;
    findLastProgressByUser(userId: string, runner: ITransactionHandler): Promise<Result<Progress>>;
}