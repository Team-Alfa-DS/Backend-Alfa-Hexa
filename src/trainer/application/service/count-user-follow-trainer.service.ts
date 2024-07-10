import { Result } from "src/common/domain/result-handler/result";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";
import { CountUserFollowRequest } from "../dto/request/count-user-follow-trainer.request";
import { CountUserFollowResponse } from "../dto/response/count-user-follow-trainer.response";
import { IOdmTrainerRepository } from "src/trainer/domain/repositories/odm-trainer-repository.interface";
import { UserId } from "src/user/domain/value-objects/user-id";
import { IService } from "src/common/application/interfaces/IService";

export class CountUserFollowTrainerService extends IService<CountUserFollowRequest, CountUserFollowResponse>{
    private readonly repository: IOdmTrainerRepository

    constructor(repository: IOdmTrainerRepository) {
        super();
        this.repository = repository;
    }

    async execute(data: CountUserFollowRequest): Promise<Result<CountUserFollowResponse>> {
        try {
            const result = await this.repository.countFollows(UserId.create(data.userId));
            if(!result) {
                return Result.fail(result.Error)
            }
            const count = result.Value;
            return Result.success(new CountUserFollowResponse(count));
        }
        catch(err){
            return Result.fail(new Error(err.message));
        }

    }


}