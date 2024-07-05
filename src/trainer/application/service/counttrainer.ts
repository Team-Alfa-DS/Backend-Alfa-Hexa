import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";

export class notifycountnotreaded implements IApplicationService<void, number>{
    private readonly repository: ITrainerRepository

    constructor(repository: ITrainerRepository) {
        this.repository = repository;
    }

    get name(): string {
        return 'notifycountnotreaded';
    }

    async execute(): Promise<Result<number>> {
        try {
            const result = await this.repository.countnotreaded();
            if(!result) {
                return Result.fail<number>(result.Error, result.StatusCode, result.Message)
            }
            const count = result.Value;
            return Result.success<number>(count, 200);
        }
        catch(err){
            return Result.fail<number>(new Error(err.message), 404, err.message);
        }

    }


}