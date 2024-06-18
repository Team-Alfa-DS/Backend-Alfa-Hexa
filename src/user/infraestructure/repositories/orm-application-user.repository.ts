import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { IUserApplicationRepository } from "src/user/application/repository/application-user.repository";
import { Result } from "src/common/domain/result-handler/result";
import { RegisterUserRequest } from "src/auth/application/dtos/request/register-user.request";
import { UserRole } from "src/user/domain/enums/role-user.type";

export class OrmUserApplicationRepository extends Repository<UserEntity> implements IUserApplicationRepository {

    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.manager);
    }

    async getUserTypeById(userId: string): Promise<Result<UserRole>> {
        try {
            const user = await this.findOneBy({id: userId});
            return Result.success(user.type, 200)
        }
        catch (err) {
            return Result.fail(new Error(err.message), err.code, err.message)
        }
    }

    async getUserPasswordById(userId: string): Promise<Result<string>> {
        try {
            const user = await this.findOneBy({id: userId});
            return Result.success(user.password, 200)
        }
        catch (err) {
            return Result.fail(new Error(err.message), err.code, err.message)
        }
    }

    async saveUser(newUser: RegisterUserRequest): Promise<Result<UserEntity>> {

        try {
            const ormUser = this.create(newUser)
            await this.save(ormUser);
            return Result.success(ormUser, 200);

        } catch (err) {
            return Result.fail(new Error(err.message), err.code, err.message);
        }
    }

}