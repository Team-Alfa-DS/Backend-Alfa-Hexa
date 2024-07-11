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
import { UserImage } from "src/user/domain/value-objects/user-image";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserPhone } from "src/user/domain/value-objects/user-phone";
import { UserNotFoundException } from "src/user/domain/exceptions/user-not-found-exception";

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
        // try {
            
        // } catch(err) {
            // return Result.fail(new UserNotFoundException(`Usuario con el id ${id.Id} no encontrado`));
        // }
        const user = await this.userModel.findOne({id: id.Id});
        if (!user) { throw new UserNotFoundException(`Usuario con el id ${id.Id} no encontrado`)}
        const domainUser = await this.odmUserMapper.toDomain(user);
        return Result.success(domainUser);
    }

    async findUserByEmail(email: UserEmail): Promise<Result<User>> {
        // try {
            
        // } catch(err) {
        //     return Result.fail(new UserNotFoundException(`Usuario con el email ${email.Email} no encontrado`));
        // }
        const user = await this.userModel.findOne({email: email.Email});
        if (!user) { new UserNotFoundException(`Usuario con el email ${email.Email} no encontrado`) }
        const domainUser = await this.odmUserMapper.toDomain(user);
        return Result.success(domainUser);
    }

    async updateUserImage(image: UserImage, user: User): Promise<void> {
        const odmUser = await this.odmUserMapper.toPersistence(user);
        odmUser.image = image.Image;
        await this.userModel.findOneAndUpdate({id: odmUser.id}, odmUser);
    }

    async updateUserPassword(password: UserPassword, user: User): Promise<void> {
        const odmUser = await this.odmUserMapper.toPersistence(user);
        odmUser.password = password.Password;
        await this.userModel.findOneAndUpdate({id: odmUser.id}, odmUser);
    }

    async updateUserName(name: UserName, user: User): Promise<void> {
        const odmUser = await this.odmUserMapper.toPersistence(user);
        odmUser.name = name.Name;
        await this.userModel.findOneAndUpdate({id: odmUser.id}, odmUser);
    }

    async updateUserEmail(email: UserEmail, user: User): Promise<void> {
        const odmUser = await this.odmUserMapper.toPersistence(user);
        odmUser.email = email.Email;
        await this.userModel.findOneAndUpdate({id: odmUser.id}, odmUser);
    }

    async updateUserPhone(phone: UserPhone, user: User): Promise<void> {
        const odmUser = await this.odmUserMapper.toPersistence(user);
        odmUser.phone = phone.Phone;
        await this.userModel.findOneAndUpdate({id: odmUser.id}, odmUser);
    }

}