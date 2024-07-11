import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { INotifyRepository } from "../repository/INotifyrepository";

export class notifycountnotreaded implements IApplicationService<void, number>{
    private readonly repository: INotifyRepository;

    constructor(repository: INotifyRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'notifycountnotreaded';
    }

    async execute(): Promise<Result<number>> {
        try {
            const result = await this.repository.countnotreaded();
            if(!result) {
                return Result.fail<number>(result.Error)
            }
            const count = result.Value;
            return Result.success<number>(count);
        }
        catch(err){
            return Result.fail<number>(new Error(err.message));
        }

    }


}