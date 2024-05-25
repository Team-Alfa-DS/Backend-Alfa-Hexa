import { IApplicationService } from "src/user/application/application-service/application-service.interface";
import { ChangeUserPasswordDto } from "../dtos/change-user-password.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "../encryptor/encryptor.interface";

export class ChangeUserPasswordService implements IApplicationService<ChangeUserPasswordDto, any> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
    }

    async execute(value: ChangeUserPasswordDto): Promise<Result<any>> {

        const hashPassword = await this.encryptor.hash(value.password);

        const user = await this.userRepository.updatePassword(value.email, hashPassword, this.transactionHandler);
        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message);
        }

        return Result.success({}, 200);
    }

    get name(): string {
        return this.constructor.name;
    }

}