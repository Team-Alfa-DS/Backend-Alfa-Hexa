import { IMapper } from "src/common/application/mappers/mapper.interface";
import { User } from "src/user/domain/user";
import { UserEntity } from "../entities/user.entity";

export class OrmUserMapper implements IMapper<User, UserEntity> {

    async toOrm(domainEntity: User): Promise<UserEntity> {
        const ormUser = UserEntity.create(
            domainEntity.Id,
            domainEntity.Email,
            domainEntity.Name,
            domainEntity.Password,
            domainEntity.Phone,
            domainEntity.Type,
            domainEntity.Image
        )
        return ormUser;
    }

    async toDomain(ormEntity: UserEntity): Promise<User> {
        const domainUser = User.Create(
            ormEntity.id,
            ormEntity.email,
            ormEntity.name,
            ormEntity.password,
            ormEntity.phone,
            ormEntity.type,
            ormEntity.image
        )
        return domainUser;
    }

}