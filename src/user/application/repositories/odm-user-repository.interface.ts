import { Result } from "src/common/domain/result-handler/result";
import { User } from "src/user/domain/user";
import { UserEmail } from "src/user/domain/value-objects/user-email";
import { UserId } from "src/user/domain/value-objects/user-id";
import { UserImage } from "src/user/domain/value-objects/user-image";
import { UserName } from "src/user/domain/value-objects/user-name";
import { UserPassword } from "src/user/domain/value-objects/user-password";
import { UserPhone } from "src/user/domain/value-objects/user-phone";

export interface IOdmUserRepository {
    findUserById(id: UserId): Promise<Result<User>>; 
    findUserByEmail(email: UserEmail): Promise<Result<User>>;
    saveUser(user: User): Promise<void>;
    updateUserImage(image: UserImage, user: User): Promise<void>;
    updateUserPassword(password: UserPassword, user: User): Promise<void>;
    updateUserName(name: UserName, user: User): Promise<void>;
    updateUserEmail(email: UserEmail, user: User): Promise<void>;
    updateUserPhone(phone: UserPhone, user: User): Promise<void>;
}