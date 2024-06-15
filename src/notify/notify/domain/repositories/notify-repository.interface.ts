/* eslint-disable @typescript-eslint/no-unused-vars */
import { Result } from "src/common/domain/result-handler/result";
import { Notify } from "../notify";
import { createNotificaciondto } from "../../Infraestructure/dto/createnotify.dto";

export interface INotifyRepository {
    getAllNotify(): Promise<Result<Notify[]>>;
    findNotifyById(id: string): Promise<Result<Notify>>;
    saveNotify(notify: Notify): Promise<Result<Notify>>;
    deleteAllNotify(): Promise<Result<void>>;
    countnotreaded(): Promise<Result<number>>;
}