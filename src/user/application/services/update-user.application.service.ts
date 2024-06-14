import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "src/auth/application/encryptor/encryptor.interface";
import { IService } from "src/common/application/interfaces/IService";
import { UpdateUserRequest } from "../dtos/request/update-user.request";
import { UpdateUserResponse } from "../dtos/response/update-user.response";

export class UpdateUserService extends IService<UpdateUserRequest, UpdateUserResponse> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor) {
        super();
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
    }

    async execute(data: UpdateUserRequest): Promise<Result<UpdateUserResponse>> {
        // await this.transactionHandler.startTransaction();
        const user = await this.userRepository.findUserById(data.id, this.transactionHandler);

        if (!user.isSuccess) {
            return Result.fail(user.Error, user.StatusCode, user.Message)
        }
        const newUser = user.Value;
        if(data.email) {
            const userEmailCheck = await this.userRepository.findUserByEmail(data.email, this.transactionHandler)
            if (userEmailCheck.isSuccess) return Result.fail(new Error('Ya existe un usuario con este email'), 400, 'Ya existe un usuario con este email');
            newUser.UpdateEmail(data.email);
        }
        if(data.name) newUser.UpdateName(data.name);
        if(data.password) {
            const hashPassword = await this.encryptor.hash(data.password); 
            newUser.UpdatePassword(hashPassword);
        }
        if(data.phone) newUser.UpdatePhone(data.phone);
        if(data.image) newUser.UpdateImage(data.image);

        const updatedUser = await this.userRepository.saveUser(newUser, this.transactionHandler);

        if (!updatedUser.isSuccess) {
            return Result.fail(updatedUser.Error, updatedUser.StatusCode, updatedUser.Message)
        }
        // await this.transactionHandler.commitTransaction();
        const response = new UpdateUserResponse(updatedUser.Value.Id);
        
        return Result.success(response, 200);
    }
}