import { IMapper } from "src/common/application/mappers/mapper.interface";
import { User } from "src/user/domain/user";
import { OdmUserEntity } from "../../entities/odm-entities/odm-user.entity";
import { UserId } from "src/user/domain/value-objects/user-id";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserPhone } from "src/user/domain/value-objects/user-phone";
import { UserType } from "src/user/domain/value-objects/user-type";
import { UserImage } from "src/user/domain/value-objects/user-image";
import { Model } from "mongoose";
import { UserRole } from "src/user/domain/enums/role-user.type";

export class OdmUserMapper implements IMapper<User, OdmUserEntity> {

    async toPersistence(DomainEntity: User): Promise<OdmUserEntity> {
        const userOdm = OdmUserEntity.create(
            DomainEntity.Id.Id,
            DomainEntity.Email.Email,
            DomainEntity.Name.Name,
            DomainEntity.Password.Password,
            DomainEntity.Phone.Phone,
            DomainEntity.Type.Type as UserRole,
            DomainEntity.Image?.Image
        );
        return userOdm;
    }

    async toDomain(odmEntity: OdmUserEntity): Promise<User> {
        const userDomain = User.Create(
            UserId.create(odmEntity.id),
            UserEmail.create(odmEntity.email),
            UserName.create(odmEntity.name),
            UserPassword.create(odmEntity.password),
            UserPhone.create(odmEntity.phone),
            UserType.create(odmEntity.type),
            odmEntity.image ? UserImage.create(odmEntity.image) : null
        );
        return userDomain;
    }

}