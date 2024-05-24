import { Notify } from "src/notify/notify/domain/notify";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";

export class findNotifyById implements IApplicationService<string, Notify> {
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'findNotifyById';
    }

    async execute(id: string): Promise<Result<Notify>> {
        const notify = await this.repository.findNotifyById(id);
        if(!notify) {
            return Result.fail<Notify>(notify.Error, notify.StatusCode, notify.Message)
        }
        return Result.success<Notify>(notify.Value, notify.StatusCode);
    }
}