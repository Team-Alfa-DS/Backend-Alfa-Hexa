import { Notify } from "src/notify/notify/domain/notify";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../../domain/repositories/notify-repository.interface";

export class getfindNotifyById implements IApplicationService<string, Notify> {
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return this.constructor.name;
    }

    async execute(id: string): Promise<Result<Notify>> {
        try {
            const notify = await this.repository.findNotifyById(id);
            if(!notify.isSuccess) {
                return Result.fail<Notify>(notify.Error)
            }
            return Result.success<Notify>(notify.Value);
        } catch (error) {
            return Result.fail(error);
        }
    }
}