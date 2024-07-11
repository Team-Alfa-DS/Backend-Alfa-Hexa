import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { User } from "src/user/domain/user";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserId } from "src/user/domain/value-objects/user-id";

export class OrmUserRepositoryMock implements IUserRepository {

    private readonly users: User[] = []

    findUserById(id: UserId, runner: ITransactionHandler): Promise<Result<User>> {
        throw new Error("Method not implemented.");
    }
    findUserByEmail(email: UserEmail, runner: ITransactionHandler): Promise<Result<User>> {
        throw new Error("Method not implemented.");
    }
    
    async saveUser(user: User, runner: ITransactionHandler): Promise<Result<User>> {
        this.users.push(user);
        return Result.success(user);
    }

}