import { User } from "src/user/domain/user";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "../encryptor/encryptor.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { IService } from "src/common/application/interfaces/IService";
import { RegisterUserRequest } from "../dtos/request/register-user.request";
import { RegisterUserResponse } from "../dtos/response/register-user.response";
import { IUserApplicationRepository } from "src/user/application/repository/application-user.repository";

export class RegisterUserService extends IService<RegisterUserRequest, RegisterUserResponse> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;
    private readonly idGenerator: IIdGen;
    private readonly userAppRepository: IUserApplicationRepository;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor, idGenerator: IIdGen, userAppRepository: IUserApplicationRepository) {
        super();
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
        this.idGenerator = idGenerator;
        this.userAppRepository = userAppRepository;
    }

    async execute(newUser: RegisterUserRequest): Promise<Result<RegisterUserResponse>> {
        // await this.transactionHandler.startTransaction();
        const userFound = await this.userRepository.findUserByEmail(newUser.email, this.transactionHandler);

        if (userFound.isSuccess) {
            return Result.fail(new Error('El usuario ya existe'), 500, 'El usuario ya existe');
        }

        const hashPassword = await this.encryptor.hash(newUser.password);
        const id = await this.idGenerator.genId();
        const userCreate = await this.userAppRepository.saveUser(new RegisterUserRequest(newUser.email, newUser.name, hashPassword, newUser.phone, newUser.type));

        if (!userCreate.isSuccess) {
            return Result.fail(userCreate.Error, userCreate.StatusCode, userCreate.Message);
        }
        // await this.transactionHandler.commitTransaction();
        const response = new RegisterUserResponse(userCreate.Value.id);

        return Result.success(response, 200);
    }
}