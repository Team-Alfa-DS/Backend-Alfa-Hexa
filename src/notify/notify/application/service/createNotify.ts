import { Notify } from "src/notify/notify/domain/notify";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";
import { NotifyEntity } from "../../Infraestructure/entities/notify.entity";


export class CreateNotify implements IApplicationService<Notify, Notify>{
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'CreateNotify';
    }

    async execute(notify: Notify): Promise<Result<Notify>> {
        const notifyCreated = await this.repository.saveNotify(notify);
        if(!notifyCreated.isSuccess) {
            return Result.fail<Notify>(notifyCreated.Error, notifyCreated.StatusCode, notifyCreated.Message)
        }
        return Result.success<Notify>(notifyCreated.Value, notifyCreated.StatusCode);
    }
}