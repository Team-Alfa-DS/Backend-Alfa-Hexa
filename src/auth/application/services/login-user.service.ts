import { Result } from "src/common/domain/result-handler/result";
import { IEncryptor } from "../encryptor/encryptor.interface";
import { IJwtGen } from "../jwt-gen/jwt-gen.interface";
import { IService } from "src/common/application/interfaces/IService";
import { LoginUserRequest } from "../dtos/request/login-user.request";
import { LoginUserResponse } from "../dtos/response/login-user.response";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";

export class LoginUserService extends IService<LoginUserRequest, LoginUserResponse> {

    private readonly userRepository: IOdmUserRepository;
    private readonly encryptor: IEncryptor;
    private readonly jwtGen: IJwtGen<string>;

    constructor(userRepository: IOdmUserRepository, encryptor: IEncryptor, jwtGen: IJwtGen<string>) {
        super();
        this.userRepository = userRepository;
        this.encryptor = encryptor;
        this.jwtGen = jwtGen;
    }

    async execute(userLogin: LoginUserRequest): Promise<Result<LoginUserResponse>> {
        // await this.transactionHandler.startTransaction();
        const userFound = await this.userRepository.findUserByEmail(UserEmail.create(userLogin.email));
        if (!userFound.isSuccess) {
            return Result.fail(userFound.Error, userFound.StatusCode, userFound.Message);
        }
        const isMatch = await this.encryptor.comparePassword(userLogin.password, userFound.Value.Password.Password);

        if (!isMatch) {
            return Result.fail(new Error('La contraseña es incorrecta'), 400, 'La contraseña es incorrecta')
        }

        const response = new LoginUserResponse(
            {id: userFound.Value.Id.Id, email: userFound.Value.Email.Email, name: userFound.Value.Name.Name, phone: userFound.Value.Phone.Phone}, 
            await this.jwtGen.genJwt(userFound.Value.Id.Id), 
            userFound.Value.Type.Type
        );

        return Result.success(response, 200);
    }
}