import { Result } from "src/common/domain/result-handler/result";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { User } from "src/user/domain/user";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserId } from "src/user/domain/value-objects/user-id";
import { UserImage } from "src/user/domain/value-objects/user-image";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserPhone } from "src/user/domain/value-objects/user-phone";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";

export class OdmUserRepository implements IOdmUserRepository {

    private readonly users: User[] = [];
    private readonly odmUsers: OdmUserEntity[] = [];

    findUserById(id: UserId): Promise<Result<User>> {
        throw new Error("Method not implemented.");
    }

    async findUserByEmail(email: UserEmail): Promise<Result<User>> {
        const user = this.odmUsers.find(user => user.email === email.Email);
        if (!user) return Result.fail(new Error('user not found'));
        return Result.success(user);
    }

    async saveUser(user: User): Promise<void> {
        this.users.push(user)
    }

    updateUserImage(image: UserImage, user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateUserPassword(password: UserPassword, user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateUserName(name: UserName, user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateUserEmail(email: UserEmail, user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateUserPhone(phone: UserPhone, user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

}