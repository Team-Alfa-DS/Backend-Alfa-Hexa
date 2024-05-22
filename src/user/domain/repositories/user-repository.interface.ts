import { Result } from "src/common/domain/result-handler/result";
import { User } from "../user";

export interface IUserRepository {
    findUserById(id: string): Promise<Result<User>>; 
    findUserByEmail(email: string): Promise<Result<User>>; 
    UpdateUser(user: User): Promise<Result<User>>; 
}