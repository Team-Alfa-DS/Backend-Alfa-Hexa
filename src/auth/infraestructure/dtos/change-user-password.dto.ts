import { IsEmail, IsNumber, IsString } from "class-validator";

export class ChangeUserPasswordDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsNumber()
    code: number;

    @IsString()
    password: string;
}