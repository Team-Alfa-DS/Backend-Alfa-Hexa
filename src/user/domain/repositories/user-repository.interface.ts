import { Result } from "src/common/domain/result-handler/result";
import { User } from "../user";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { UserId } from "../value-objects/user-id";
import { UserEmail } from "../value-objects/user-email";
import { UserPassword } from "../value-objects/user-password";

export interface IUserRepository {
    findUserById(id: UserId, runner: ITransactionHandler): Promise<Result<User>>; 
    findUserByEmail(email: UserEmail, runner: ITransactionHandler): Promise<Result<User>>; 
    updatePassword(email: UserEmail, password: UserPassword, runner: ITransactionHandler): Promise<Result<User>>;
    saveUser(user: User, runner: ITransactionHandler): Promise<Result<User>>;
}