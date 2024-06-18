import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "src/auth/application/encryptor/encryptor.interface";
import { IService } from "src/common/application/interfaces/IService";
import { UpdateUserRequest } from "../dtos/request/update-user.request";
import { UpdateUserResponse } from "../dtos/response/update-user.response";
import { IUserApplicationRepository } from "../repository/application-user.repository";
import { RegisterUserRequest } from "src/auth/application/dtos/request/register-user.request";

export class UpdateUserService extends IService<UpdateUserRequest, UpdateUserResponse> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;
    private readonly userAppRepository: IUserApplicationRepository;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor, userAppRepository: IUserApplicationRepository) {
        super();
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
        this.userAppRepository = userAppRepository;
    }

    async execute(data: UpdateUserRequest): Promise<Result<UpdateUserResponse>> {
        // await this.transactionHandler.startTransaction();
        const user = await this.userRepository.findUserById(data.id, this.transactionHandler);

        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message);
        }

        const userPassword = await this.userAppRepository.getUserPasswordById(user.Value.Id);
        const userType = await this.userAppRepository.getUserTypeById(user.Value.Id);

        if (!userPassword.isSuccess) {
            return Result.fail(userPassword.Error, userPassword.StatusCode, userPassword.Message);
        }

        const newUser = {id: user.Value.Id, email: user.Value.Email.Email, name: user.Value.Name.Name, phone: user.Value.Phone.Phone, image: user.Value.Image.Image, password: userPassword.Value, type: userType.Value};
        if(data.email) {
            const userEmailCheck = await this.userRepository.findUserByEmail(data.email, this.transactionHandler)
            if (userEmailCheck.isSuccess) return Result.fail(new Error('Ya existe un usuario con este email'), 400, 'Ya existe un usuario con este email');
            newUser.email = data.email;
        }
        if(data.name) newUser.name = data.name;
        if(data.password) {
            const hashPassword = await this.encryptor.hash(data.password); 
            newUser.password = hashPassword;
        }
        if(data.phone) newUser.phone = data.phone;
        if(data.image) newUser.image = data.image;

        const updatedUser = await this.userAppRepository.saveUser(new RegisterUserRequest(newUser.email, newUser.name, newUser.password, newUser.phone, newUser.type));

        if (!updatedUser.isSuccess) {
            return Result.fail(updatedUser.Error, updatedUser.StatusCode, updatedUser.Message)
        }
        // await this.transactionHandler.commitTransaction();
        const response = new UpdateUserResponse(updatedUser.Value.id);
        
        return Result.success(response, 200);
    }
}