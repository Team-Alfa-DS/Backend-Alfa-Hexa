import { IMapper } from "src/common/application/mappers/mapper.interface";
import { User } from "src/user/domain/user";
import { UserEntity } from "../entities/user.entity";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserPhone } from "src/user/domain/value-objects/user-phone";
import { UserImage } from "src/user/domain/value-objects/user-image";
import { UserId } from "src/user/domain/value-objects/user-id";

export class OrmUserMapper implements IMapper<User, UserEntity> {

    async toOrm(domainEntity: User): Promise<UserEntity> {
        const ormUser = UserEntity.create(
            domainEntity.Id.Id,
            domainEntity.Email.Email,
            domainEntity.Name.Name,
            domainEntity.Password.Password,
            domainEntity.Phone.Phone,
            domainEntity.Type,
            domainEntity.Image.Image
        )
        return ormUser;
    }

    async toDomain(ormEntity: UserEntity): Promise<User> {
        const domainUser = User.Create(
            UserId.create(ormEntity.id),
            UserEmail.create(ormEntity.email),
            UserName.create(ormEntity.name),
            UserPassword.create(ormEntity.password),
            UserPhone.create(ormEntity.phone),
            ormEntity.type,
            UserImage.create(ormEntity.image)
        )
        return domainUser;
    }

}