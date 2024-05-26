import { User } from "src/user/domain/user";
import { IApplicationService } from "../../../common/application/application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEncryptor } from "src/auth/application/encryptor/encryptor.interface";

export class UpdateUserService implements IApplicationService<UpdateUserDto, any> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly encryptor: IEncryptor;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler, encryptor: IEncryptor) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.encryptor = encryptor;
    }

    async execute(data: UpdateUserDto): Promise<Result<any>> {
        // await this.transactionHandler.startTransaction();
        const user = await this.userRepository.findUserById(data.id, this.transactionHandler);

        if (!user.isSuccess) {
            return Result.fail<User>(user.Error, user.StatusCode, user.Message)
        }
        const hashPassword = await this.encryptor.hash(data.password); 
        const newUser = user.Value;
        if(data.email) {
            const userEmailCheck = await this.userRepository.findUserByEmail(data.email, this.transactionHandler)
            if (userEmailCheck.isSuccess) return Result.fail(new Error('Ya existe un usuario con este email'), 400, 'Ya existe un usuario con este email');
            newUser.UpdateEmail(data.email);
        }
        if(data.name) newUser.UpdateName(data.name);
        if(data.password) newUser.UpdatePassword(hashPassword);
        if(data.phone) newUser.UpdatePhone(data.phone);
        if(data.image) newUser.UpdateImage(data.image);

        const updatedUser = await this.userRepository.saveUser(newUser, this.transactionHandler);

        if (!updatedUser.isSuccess) {
            return Result.fail<User>(updatedUser.Error, updatedUser.StatusCode, updatedUser.Message)
        }
        // await this.transactionHandler.commitTransaction();
        const response = {
            id: updatedUser.Value.Id
        }
        return Result.success(response, 200);
    }

    get name(): string {
        return this.constructor.name;
    }

}