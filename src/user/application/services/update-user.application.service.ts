import { User } from "src/user/domain/user";
import { IApplicationService } from "../application-service/application-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { UpdateUserDto } from "../dtos/update-user.dto";

export class UpdateUser implements IApplicationService<UpdateUserDto, User> {

    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(data: UpdateUserDto): Promise<Result<User>> {
        const user = await this.userRepository.findUserById(data.id);

        if (!user.isSuccess) {
            return Result.fail<User>(user.Error, user.StatusCode, user.Message)
        }

        const newUser = user.Value;
        if(data.email) newUser.UpdateEmail(data.email);
        if(data.name) newUser.UpdateName(data.name);
        if(data.password) newUser.UpdatePassword(data.password);
        if(data.phone) newUser.UpdatePhone(data.phone);
        if(data.image) newUser.UpdateImage(data.image);

        const updatedUser = await this.userRepository.UpdateUser(newUser);

        if (!updatedUser.isSuccess) {
            return Result.fail<User>(user.Error, user.StatusCode, user.Message)
        }

        return updatedUser;
    }

    get name(): string {
        return this.constructor.name;
    }

}