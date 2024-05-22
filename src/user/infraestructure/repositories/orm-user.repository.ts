import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { Result } from "src/common/domain/result-handler/result";
import { User } from "src/user/domain/user";

export class OrmUserRepository extends Repository<UserEntity> implements IUserRepository {

    findUserById(id: string): Promise<Result<User>> {
        throw new Error("Method not implemented.");
    }

    findUserByEmail(email: string): Promise<Result<User>> {
        throw new Error("Method not implemented.");
    }

    UpdateUser(user: User): Promise<Result<User>> {
        throw new Error("Method not implemented.");
    }

}