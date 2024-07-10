import { Result } from "src/common/domain/result-handler/result";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { UserRole } from "src/user/domain/enums/role-user.type";
import { User } from "src/user/domain/user";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserId } from "src/user/domain/value-objects/user-id";
import { UserImage } from "src/user/domain/value-objects/user-image";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserPhone } from "src/user/domain/value-objects/user-phone";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { OdmUserMapper } from "src/user/infraestructure/mappers/odm-mappers/odm-user.mapper";

export class OdmUserRepositoryMock implements IOdmUserRepository {

    private readonly users: User[] = [];
    private readonly odmUsers: OdmUserEntity[] = [
        {
            id: '244fbecc-2127-433d-ba76-762fb2fee1c8', 
            email: 'dbcd@gmail.com', 
            name: 'Daniel Bortot',
            password: '12345',
            phone: '12345678910',
            type: UserRole.CLIENT,
            image: null
        }
    ];

    private readonly odmUserMapper = new OdmUserMapper();

    async findUserById(id: UserId): Promise<Result<User>> {
        const user = this.odmUsers.find(user => user.id === id.Id);
        if (!user) return Result.fail(new Error('user not found'));
        const userDomain = await this.odmUserMapper.toDomain(user);
        return Result.success(userDomain);
    }

    async findUserByEmail(email: UserEmail): Promise<Result<User>> {
        const user = this.odmUsers.find(user => user.email === email.Email);
        if (!user) return Result.fail(new Error('user not found'));
        const userDomain = await this.odmUserMapper.toDomain(user);
        return Result.success(userDomain);
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