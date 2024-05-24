import { Result } from "src/common/domain/result-handler/result";
import { User } from "../user";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export interface IUserRepository {
    findUserById(id: string, runner: ITransactionHandler): Promise<Result<User>>; 
    findUserByEmail(email: string, runner: ITransactionHandler): Promise<Result<User>>; 
    updatePassword(email: string, password: string, runner: ITransactionHandler): Promise<Result<User>>;
    saveUser(user: User, runner: ITransactionHandler): Promise<Result<User>>;
}