import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IService } from "src/common/application/interfaces/IService";
import { CurrentUserRequest } from "../dtos/request/current-user.request";
import { CurrentUserResponse } from "../dtos/response/current-user.response";
import { UserId } from "src/user/domain/value-objects/user-id";

export class CurrentUserService extends IService<CurrentUserRequest, CurrentUserResponse> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler) {
        super()
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }
    
    async execute(value: CurrentUserRequest): Promise<Result<CurrentUserResponse>> {
        const userFound = await this.userRepository.findUserById(UserId.create(value.id), this.transactionHandler);

        if (!userFound.isSuccess) {
            return Result.fail(userFound.Error, userFound.StatusCode, userFound.Message);
        }

        const response = new CurrentUserResponse(
            userFound.Value.Id.Id,
            userFound.Value.Email.Email,
            userFound.Value.Name.Name,
            userFound.Value.Phone.Phone,
            userFound.Value.Image?.Image ? userFound.Value.Image.Image : null
        );

        return Result.success(response, 200);
    }
}