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
import { IOdmUserRepository } from "../repositories/odm-user-repository.interface";

export class UpdateUserService extends IService<UpdateUserRequest, UpdateUserResponse> {

    private readonly odmUserRepository: IOdmUserRepository;
    private readonly ormUserRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;
    private readonly eventPublisher: IEventPublisher

    constructor(ormUserRepository: IUserRepository, odmUserRepository: IOdmUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor, eventPublisher: IEventPublisher) {
        super();
        this.ormUserRepository = ormUserRepository;
        this.odmUserRepository = odmUserRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
        this.eventPublisher = eventPublisher;
    }

    async execute(data: UpdateUserRequest): Promise<Result<UpdateUserResponse>> {
        // await this.transactionHandler.startTransaction();
        const user = await this.odmUserRepository.findUserById(UserId.create(data.id));

        if (!user.isSuccess) {
            return Result.fail(user.Error)
        }
        const newUser = user.Value;
        if(data.email) {
            const userEmailCheck = await this.odmUserRepository.findUserByEmail(UserEmail.create(data.email));
            if (userEmailCheck.isSuccess) return Result.fail(new Error('Ya existe un usuario con este email'));
            newUser.UpdateEmail(UserEmail.create(data.email));
        }
        if(data.name) newUser.UpdateName(UserName.create(data.name));
        if(data.password) {
            const hashPassword = await this.encryptor.hash(data.password); 
            newUser.UpdatePassword(UserPassword.create(hashPassword));
        }
        if(data.phone) newUser.UpdatePhone(UserPhone.create(data.phone));
        if(data.image) newUser.UpdateImage(UserImage.create(data.image));

        const updatedUser = await this.ormUserRepository.saveUser(newUser, this.transactionHandler);

        if (!updatedUser.isSuccess) {
            return Result.fail(updatedUser.Error)
        }
        // await this.transactionHandler.commitTransaction();
        this.eventPublisher.publish(newUser.pullDomainEvents())
        const response = new UpdateUserResponse(updatedUser.Value.Id.Id);
        
        return Result.success(response);
    }
}