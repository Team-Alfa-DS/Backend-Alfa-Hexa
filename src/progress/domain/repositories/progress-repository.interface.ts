import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Progress } from "../progress";
import { Result } from "src/common/domain/result-handler/result";
import { Lesson } from "src/course/domain/Lesson";
import { UserId } from "src/user/domain/value-objects/user-id";

export interface IProgressRepository {

    saveProgress(progress: Progress, runner: ITransactionHandler): Promise<Result<Progress>>;
    findProgressByUserCourse(userId: UserId, lessons: Lesson[], runner: ITransactionHandler): Promise<Result<Progress[]>>;
    findLastProgressByUser(userId: UserId, runner: ITransactionHandler): Promise<Result<Progress>>;
    findProgressByUser(userId: UserId, runner: ITransactionHandler): Promise<Result<Progress[]>>;
}