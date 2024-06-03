import { UserRole } from "src/user/domain/enums/role-user.type";

export class RegisterUserDto {
    email: string;
    name: string;
    password: string;
    phone: string;
    type: UserRole;
}