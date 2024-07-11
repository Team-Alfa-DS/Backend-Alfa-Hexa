import { Result } from "src/common/domain/result-handler/result";
import { IService } from "src/common/application/interfaces/IService";
import { CurrentUserRequest } from "../dtos/request/current-user.request";
import { CurrentUserResponse } from "../dtos/response/current-user.response";
import { UserId } from "src/user/domain/value-objects/user-id";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";

export class CurrentUserService extends IService<CurrentUserRequest, CurrentUserResponse> {

    private readonly userRepository: IOdmUserRepository;

    constructor(userRepository: IOdmUserRepository) {
        super()
        this.userRepository = userRepository;
    }
    
    async execute(value: CurrentUserRequest): Promise<Result<CurrentUserResponse>> {
        try {
            const userFound = await this.userRepository.findUserById(UserId.create(value.id));

            if (!userFound.isSuccess) {
                return Result.fail(userFound.Error);
            }

            const response = new CurrentUserResponse(
                userFound.Value.Id.Id,
                userFound.Value.Email.Email,
                userFound.Value.Name.Name,
                userFound.Value.Phone.Phone,
                userFound.Value.Image?.Image ? userFound.Value.Image.Image : null
            );

            return Result.success(response);
        } catch (error) {
            return Result.fail(error);
        }
    }
}