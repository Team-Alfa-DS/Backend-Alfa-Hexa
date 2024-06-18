import { IMapper } from "src/common/application/mappers/mapper.interface";
import { User } from "src/user/domain/user";
import { UserEntity } from "../entities/user.entity";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPhone } from "src/user/domain/value-objects/user-phone";
import { UserImage } from "src/user/domain/value-objects/user-image";

export class OrmUserMapper implements IMapper<User, UserEntity> {

    async toOrm(domainEntity: User): Promise<UserEntity> {
        const ormUser = UserEntity.create(
            domainEntity.Id,
            domainEntity.Email.Email,
            domainEntity.Name.Name,
            domainEntity.Phone.Phone,
            domainEntity.Image.Image
        )
        return ormUser;
    }

    async toDomain(ormEntity: UserEntity): Promise<User> {
        const domainUser = User.Create(
            ormEntity.id,
            UserEmail.create(ormEntity.email),
            UserName.create(ormEntity.name),
            UserPhone.create(ormEntity.phone),
            UserImage.create(ormEntity.image),
        )
        return domainUser;
    }

}