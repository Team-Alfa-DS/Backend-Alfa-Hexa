import { IsEmail, IsEnum, IsString, Max, Min } from "class-validator";
import { UserRole } from "src/user/domain/enums/role-user.type";

export class RegisterUserDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsString()
    @Min(11)
    @Max(11)
    phone: string;

    @IsEnum(UserRole)
    type: UserRole;
}