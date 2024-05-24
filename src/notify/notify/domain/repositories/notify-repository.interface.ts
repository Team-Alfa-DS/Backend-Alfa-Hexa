import { Result } from "src/common/domain/result-handler/result";
import { Notify } from "../notify";

export interface INotifyRepository {
    getAllNotify(): Promise<Result<Notify[]>>;
    findNotifyById(id: string): Promise<Result<Notify>>;
    saveNotify(notify: Notify): Promise<Result<Notify>>;
    deleteAllNotify(): Promise<Result<void>>;
    countnotreaded(): Promise<Result<number>>;
}