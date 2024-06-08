import { IsEmail, IsEnum, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
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
    @MinLength(11)
    @MaxLength(11)
    phone: string;

    @IsEnum(UserRole)
    type: UserRole;
}