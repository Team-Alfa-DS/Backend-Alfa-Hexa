import { Result } from "src/common/domain/result-handler/result";
import { NotifyEntity } from "../../Infraestructure/entities/notify.entity";


export interface INotifyRepository {
    getAllNotify(): Promise<Result<NotifyEntity[]>>;
    findNotifyById(id: string): Promise<Result<NotifyEntity>>;
    //saveNotify(notify: string): Promise<Result<string>>;
    deleteAllNotify(): Promise<Result<void>>;
    countnotreaded(): Promise<Result<number>>;
}