import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "../encryptor/encryptor.interface";
import { IJwtGen } from "../jwt-gen/jwt-gen.interface";
import { IService } from "src/common/application/interfaces/IService";
import { LoginUserRequest } from "../dtos/request/login-user.request";
import { LoginUserResponse } from "../dtos/response/login-user.response";

export class LoginUserService implements IService<LoginUserRequest, LoginUserResponse> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;
    private readonly jwtGen: IJwtGen<string>;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor, jwtGen: IJwtGen<string>) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
        this.jwtGen = jwtGen;
    }

    async execute(userLogin: LoginUserRequest): Promise<Result<LoginUserResponse>> {
        // await this.transactionHandler.startTransaction();
        const userFound = await this.userRepository.findUserByEmail(userLogin.email, this.transactionHandler);
        if (!userFound.isSuccess) {
            return Result.fail(userFound.Error, userFound.StatusCode, userFound.Message);
        }
        const isMatch = await this.encryptor.comparePassword(userLogin.password, userFound.Value.Password);

        if (!isMatch) {
            return Result.fail(new Error('La contraseña es incorrecta'), 400, 'La contraseña es incorrecta')
        }

        const response = new LoginUserResponse({id: userFound.Value.Id, email: userFound.Value.Email, name: userFound.Value.Name, phone: userFound.Value.Phone}, await this.jwtGen.genJwt(userFound.Value.Id), userFound.Value.Type);

        return Result.success(response, 200);
    }
}