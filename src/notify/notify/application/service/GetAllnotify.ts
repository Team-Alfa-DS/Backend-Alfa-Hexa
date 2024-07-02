import { Notify } from "src/notify/notify/domain/notify";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";

export class GetAllNotify implements IApplicationService<void, Notify[]> {
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'GetAllNotify';
    }

    async execute(): Promise<Result<Notify[]>> {
        try {
            const result = await this.repository.getAllNotify();
            if (result.Error) {
                return Result.fail<Notify[]>(result.Error);
            }
            return Result.success<Notify[]>(result.Value);
        } catch(err) {
            return Result.fail<Notify[]>(new Error(err.message));
        }
    }


}