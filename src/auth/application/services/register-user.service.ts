import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { User } from "src/user/domain/user";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "../encryptor/encryptor.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";

export class RegisterUserService implements IApplicationService<RegisterUserDto, {id: string}> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;
    private readonly idGenerator: IIdGen;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor, idGenerator: IIdGen) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
        this.idGenerator = idGenerator;
    }

    async execute(newUser: RegisterUserDto): Promise<Result<{id: string}>> {
        // await this.transactionHandler.startTransaction();
        const userFound = await this.userRepository.findUserByEmail(newUser.email, this.transactionHandler);

        if (userFound.isSuccess) {
            return Result.fail(new Error('El usuario ya existe'), 500, 'El usuario ya existe');
        }

        const hashPassword = await this.encryptor.hash(newUser.password);
        const id = await this.idGenerator.genId();
        const userCreate = await this.userRepository.saveUser(
            User.Create(
                id,
                newUser.email,
                newUser.name,
                hashPassword,
                newUser.phone,
                newUser.type
            ),
            this.transactionHandler
        );
        if (!userCreate.isSuccess) {
            return Result.fail(userCreate.Error, userCreate.StatusCode, userCreate.Message);
        }
        // await this.transactionHandler.commitTransaction();
        return Result.success({id}, 200);
    }

    get name(): string {
        return this.constructor.name;
    }

}