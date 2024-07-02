import { Model } from "mongoose";
import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { User } from "src/user/domain/user";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserId } from "src/user/domain/value-objects/user-id";
import { OdmUserEntity } from "../entities/odm-entities/odm-user.entity";
import { OdmUserMapper } from "../mappers/odm-mappers/odm-user.mapper";

export class OdmUserRespository implements IOdmUserRepository {

    private readonly userModel: Model<OdmUserEntity>;
    private readonly odmUserMapper: OdmUserMapper;

    constructor (odmUserMapper: OdmUserMapper, userModel: Model<OdmUserEntity>) {
        this.userModel = userModel;
        this.odmUserMapper = odmUserMapper;
    }

    async saveUser(user: User): Promise<void> {
        const odmUser = await this.odmUserMapper.toPersistence(user);
        await this.userModel.create(odmUser);
    }

    async findUserById(id: UserId): Promise<Result<User>> {
        try {
            const user = await this.userModel.findOne({id: id.Id});
            const domainUser = await this.odmUserMapper.toDomain(user);
            return Result.success(domainUser);
        } catch(err) {
            return Result.fail(new Error(err.message));
        }
    }

    async findUserByEmail(email: UserEmail): Promise<Result<User>> {
        try {
            const user = await this.userModel.findOne({email: email.Email});
            const domainUser = await this.odmUserMapper.toDomain(user);
            return Result.success(domainUser);
        } catch(err) {
            return Result.fail(new Error(err.message));
        }
    }

}