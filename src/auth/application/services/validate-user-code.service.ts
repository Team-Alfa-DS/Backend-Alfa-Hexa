import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IService } from "src/common/application/interfaces/IService";
import { ValidateUserCodeRequest } from "../dtos/request/validate-user-code.request";
import { ValidateUserCodeResponse } from "../dtos/response/validate-user-code.response";

export class ValidateUserCodeService extends IService<ValidateUserCodeRequest, ValidateUserCodeResponse> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler) {
        super();
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }

    async execute(value: ValidateUserCodeRequest): Promise<Result<ValidateUserCodeResponse>> {
        const user = await this.userRepository.findUserByEmail(value.email, this.transactionHandler);
        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message)
        }
        
        if (value.code != value.codeSaved) {
            return Result.fail(new Error('El codigo no es correcto'), 500, 'El codigo no es correcto');
        }
        const response = new ValidateUserCodeResponse();
        return Result.success(response, 200);
    }
}