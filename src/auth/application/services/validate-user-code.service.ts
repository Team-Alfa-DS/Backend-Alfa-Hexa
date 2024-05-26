import { IApplicationService } from "src/user/application/application-service/application-service.interface";
import { ValidateUserCodeDto } from "../dtos/validate-user-code.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export class ValidateUserCodeService implements IApplicationService<ValidateUserCodeDto, any> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }

    async execute(value: ValidateUserCodeDto): Promise<Result<any>> {
        const user = await this.userRepository.findUserByEmail(value.email, this.transactionHandler);
        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message)
        }
        
        if (value.code != value.codeSaved) {
            return Result.fail(new Error('El codigo no es correcto'), 500, 'El codigo no es correcto');
        }

        return Result.success({}, 200);
    }

    get name(): string {
        return this.constructor.name;
    }

}