import { User } from "src/user/domain/user";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export class UpdateUserService implements IApplicationService<UpdateUserDto, User> {

    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(userRepository: IUserRepository, transactionHandler: ITransactionHandler) {
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }

    async execute(data: UpdateUserDto): Promise<Result<User>> {
        await this.transactionHandler.startTransaction();
        const user = await this.userRepository.findUserById(data.id, this.transactionHandler);

        if (!user.isSuccess) {
            return Result.fail<User>(user.Error, user.StatusCode, user.Message)
        }

        const newUser = user.Value;
        if(data.email) newUser.UpdateEmail(data.email);
        if(data.name) newUser.UpdateName(data.name);
        if(data.password) newUser.UpdatePassword(data.password);
        if(data.phone) newUser.UpdatePhone(data.phone);
        if(data.image) newUser.UpdateImage(data.image);

        const updatedUser = await this.userRepository.saveUser(newUser, this.transactionHandler);

        if (!updatedUser.isSuccess) {
            return Result.fail<User>(user.Error, user.StatusCode, user.Message)
        }
        await this.transactionHandler.commitTransaction();
        return updatedUser;
    }

    get name(): string {
        return this.constructor.name;
    }

}