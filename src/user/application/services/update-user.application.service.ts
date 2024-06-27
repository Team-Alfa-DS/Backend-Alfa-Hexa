import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "src/auth/application/encryptor/encryptor.interface";
import { IService } from "src/common/application/interfaces/IService";
import { UpdateUserRequest } from "../dtos/request/update-user.request";
import { UpdateUserResponse } from "../dtos/response/update-user.response";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserPhone } from "src/user/domain/value-objects/user-phone";
import { UserImage } from "src/user/domain/value-objects/user-image";
import { UserId } from "src/user/domain/value-objects/user-id";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";

export class UpdateUserService extends IService<UpdateUserRequest, UpdateUserResponse> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;
    private readonly eventPublisher: IEventPublisher

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor, eventPublisher: IEventPublisher) {
        super();
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
        this.eventPublisher = eventPublisher;
    }

    async execute(data: UpdateUserRequest): Promise<Result<UpdateUserResponse>> {
        // await this.transactionHandler.startTransaction();
        const user = await this.userRepository.findUserById(UserId.create(data.id), this.transactionHandler);

        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message)
        }
        const newUser = user.Value;
        if(data.email) {
            const userEmailCheck = await this.userRepository.findUserByEmail(UserEmail.create(data.email), this.transactionHandler)
            if (userEmailCheck.isSuccess) return Result.fail(new Error('Ya existe un usuario con este email'), 400, 'Ya existe un usuario con este email');
            newUser.UpdateEmail(UserEmail.create(data.email));
        }
        if(data.name) newUser.UpdateName(UserName.create(data.name));
        if(data.password) {
            const hashPassword = await this.encryptor.hash(data.password); 
            newUser.UpdatePassword(UserPassword.create(hashPassword));
        }
        if(data.phone) newUser.UpdatePhone(UserPhone.create(data.phone));
        if(data.image) newUser.UpdateImage(UserImage.create(data.image));

        const updatedUser = await this.userRepository.saveUser(newUser, this.transactionHandler);

        if (!updatedUser.isSuccess) {
            return Result.fail(updatedUser.Error, updatedUser.StatusCode, updatedUser.Message)
        }
        // await this.transactionHandler.commitTransaction();
        if (data.password) this.eventPublisher.publish(newUser.pullDomainEvents())
        const response = new UpdateUserResponse(updatedUser.Value.Id.Id);
        
        return Result.success(response, 200);
    }
}