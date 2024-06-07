import { IsEmail, IsString } from "class-validator";

export class ForgetUserPasswordDto {
    @IsEmail()
    @IsString()
    email: string;
}