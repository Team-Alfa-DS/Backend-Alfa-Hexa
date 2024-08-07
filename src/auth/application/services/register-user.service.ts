import { User } from "src/user/domain/user";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "../encryptor/encryptor.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { IService } from "src/common/application/interfaces/IService";
import { RegisterUserRequest } from "../dtos/request/register-user.request";
import { RegisterUserResponse } from "../dtos/response/register-user.response";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserPhone } from "src/user/domain/value-objects/user-phone";
import { UserId } from "src/user/domain/value-objects/user-id";
import { UserType } from "src/user/domain/value-objects/user-type";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";

export class RegisterUserService extends IService<RegisterUserRequest, RegisterUserResponse> {

    private readonly ormUserRepository: IUserRepository;
    private readonly odmUserRepository: IOdmUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;
    private readonly idGenerator: IIdGen;
    private readonly eventPublisher: IEventPublisher;

    constructor(ormUserRepository: IUserRepository, odmUserRepository: IOdmUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor, idGenerator: IIdGen, eventPublisher: IEventPublisher) {
        super();
        this.ormUserRepository = ormUserRepository;
        this.odmUserRepository = odmUserRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
        this.idGenerator = idGenerator;
        this.eventPublisher = eventPublisher;
    }

    async execute(newUser: RegisterUserRequest): Promise<Result<RegisterUserResponse>> {
        // await this.transactionHandler.startTransaction();
        const userFound = await this.odmUserRepository.findUserByEmail(UserEmail.create(newUser.email));

        if (userFound.isSuccess) {
            return Result.fail(new Error('El usuario ya existe'));
        }

        const hashPassword = await this.encryptor.hash(newUser.password);
        const id = await this.idGenerator.genId();
        const userDomain = User.Create(
            UserId.create(id),
            UserEmail.create(newUser.email),
            UserName.create(newUser.name),
            UserPassword.create(hashPassword),
            UserPhone.create(newUser.phone),
            UserType.create(newUser.type),
            null
        );

        const userCreate = await this.ormUserRepository.saveUser(
            userDomain,
            this.transactionHandler
        );
        if (!userCreate.isSuccess) {
            return Result.fail(userCreate.Error);
        }
        // await this.transactionHandler.commitTransaction();
        userDomain.Register(userDomain.Id, userDomain.Email, userDomain.Name, userDomain.Password, userDomain.Phone, userDomain.Type, userDomain.Image);
        this.eventPublisher.publish(userDomain.pullDomainEvents());

        const response = new RegisterUserResponse(id);

        return Result.success(response);
    }
}