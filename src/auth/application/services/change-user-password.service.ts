import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "../encryptor/encryptor.interface";
import { IService } from "src/common/application/interfaces/IService";
import { ChangeUserPasswordRequest } from "../dtos/request/change-user-password.request";
import { ChangeUserPasswordResponse } from "../dtos/response/change-user-password.response";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";

export class ChangeUserPasswordService extends IService<ChangeUserPasswordRequest, ChangeUserPasswordResponse> {

    private readonly userRepository: IUserRepository;
    private readonly odmUserRepository: IOdmUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;
    private readonly eventPublisher: IEventPublisher;

    constructor(userRepository: IUserRepository, odmUserRepository: IOdmUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor, eventPublisher: IEventPublisher) {
        super()
        this.userRepository = userRepository;
        this.odmUserRepository = odmUserRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
        this.eventPublisher = eventPublisher;
    }

    async execute(value: ChangeUserPasswordRequest): Promise<Result<ChangeUserPasswordResponse>> {
        try {
            const user = await this.odmUserRepository.findUserByEmail(UserEmail.create(value.email));

            if (!user.isSuccess) {
                return Result.fail(user.Error);
            }
            const userDomain = user.Value;
            const hashPassword = await this.encryptor.hash(value.password);
            userDomain.UpdatePassword(UserPassword.create(hashPassword));

            const updatedUser = await this.userRepository.saveUser(user.Value, this.transactionHandler);

            if (!updatedUser.isSuccess) {
                return Result.fail(user.Error);
            }

            this.eventPublisher.publish(userDomain.pullDomainEvents());

            const response = new ChangeUserPasswordResponse();
            return Result.success(response);
            
        } catch (error) {
            return Result.fail(error);
        }
    }
}