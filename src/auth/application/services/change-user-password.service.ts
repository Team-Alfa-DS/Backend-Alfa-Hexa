import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "../encryptor/encryptor.interface";
import { IService } from "src/common/application/interfaces/IService";
import { ChangeUserPasswordRequest } from "../dtos/request/change-user-password.request";
import { ChangeUserPasswordResponse } from "../dtos/response/change-user-password.response";

export class ChangeUserPasswordService implements IService<ChangeUserPasswordRequest, ChangeUserPasswordResponse> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
    }

    async execute(value: ChangeUserPasswordRequest): Promise<Result<ChangeUserPasswordResponse>> {

        const hashPassword = await this.encryptor.hash(value.password);

        const user = await this.userRepository.updatePassword(value.email, hashPassword, this.transactionHandler);
        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message);
        }
        const response = new ChangeUserPasswordResponse();
        return Result.success(response, 200);
    }
}