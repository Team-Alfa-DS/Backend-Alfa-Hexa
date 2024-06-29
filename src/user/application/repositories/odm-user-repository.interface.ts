import { Result } from "src/common/domain/result-handler/result";
import { User } from "src/user/domain/user";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserId } from "src/user/domain/value-objects/user-id";

export interface IOdmUserRepository {
    findUserById(id: UserId): Promise<Result<User>>; 
    findUserByEmail(email: UserEmail): Promise<Result<User>>;
    saveUser(user: User): Promise<void>;
}