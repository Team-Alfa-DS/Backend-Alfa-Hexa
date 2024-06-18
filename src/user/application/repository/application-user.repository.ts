import { RegisterUserRequest } from "src/auth/application/dtos/request/register-user.request";
import { Result } from "src/common/domain/result-handler/result";
import { UserRole } from "src/user/domain/enums/role-user.type";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";

export interface IUserApplicationRepository {
    getUserPasswordById(userId: string): Promise<Result<string>>;
    getUserTypeById(userId: string): Promise<Result<UserRole>>;
    saveUser(newUser: RegisterUserRequest): Promise<Result<UserEntity>>
}