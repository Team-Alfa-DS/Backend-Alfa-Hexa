import { IApplicationService } from "src/user/application/application-service/application-service.interface";
import { ForgetUserPasswordDto } from "../dtos/forget-user-password.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export class ForgetUserPasswordService implements IApplicationService<ForgetUserPasswordDto, any> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }

    async execute(value: ForgetUserPasswordDto): Promise<Result<any>> {
        const user = await this.userRepository.findUserByEmail(value.email, this.transactionHandler);
        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message)
        }
        const response = {
            date: new Date()
        }
        return Result.success(response, 200);
    }

    get name(): string {
        return this.constructor.name;
    }

}