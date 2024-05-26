import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { CurrentUserDto } from "../dtos/current-user.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export class CurrentUserService implements IApplicationService<CurrentUserDto, any> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }
    
    async execute(value: CurrentUserDto): Promise<Result<any>> {
        const userFound = await this.userRepository.findUserById(value.id, this.transactionHandler);

        if (!userFound.isSuccess) {
            return Result.fail(userFound.Error, userFound.StatusCode, userFound.Message);
        }

        const response = {
            id: userFound.Value.Id,
            email: userFound.Value.Email,
            name: userFound.Value.Name,
            phone: userFound.Value.Phone,
            image: userFound.Value.Image,
        }

        return Result.success(response, 200);
    }
    get name(): string {
        return this.constructor.name;
    }

}