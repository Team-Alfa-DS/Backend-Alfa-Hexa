import { IMapper } from "src/common/application/mappers/mapper.interface";
import { User } from "src/user/domain/user";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserPhone } from "src/user/domain/value-objects/user-phone";
import { UserImage } from "src/user/domain/value-objects/user-image";
import { UserId } from "src/user/domain/value-objects/user-id";
import { UserType } from "src/user/domain/value-objects/user-type";
import { UserRole } from "src/user/domain/enums/role-user.type";
import { OrmUserEntity } from "../../entities/orm-entities/orm-user.entity";

export class OrmUserMapper implements IMapper<User, OrmUserEntity> {

    async toOrm(domainEntity: User): Promise<OrmUserEntity> {
        const ormUser = OrmUserEntity.create(
            domainEntity.Id.Id,
            domainEntity.Email.Email,
            domainEntity.Name.Name,
            domainEntity.Password.Password,
            domainEntity.Phone.Phone,
            domainEntity.Type.Type as UserRole,
            domainEntity.Image?.Image
        )
        return ormUser;
    }

    async toDomain(ormEntity: OrmUserEntity): Promise<User> {
        const domainUser = User.Create(
            UserId.create(ormEntity.id),
            UserEmail.create(ormEntity.email),
            UserName.create(ormEntity.name),
            UserPassword.create(ormEntity.password),
            UserPhone.create(ormEntity.phone),
            UserType.create(ormEntity.type),
            ormEntity.image ? UserImage.create(ormEntity.image) : null
        )
        return domainUser;
    }

}