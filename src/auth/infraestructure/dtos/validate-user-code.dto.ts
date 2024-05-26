import { IsEmail, IsNumber, IsString } from "class-validator";

export class ValidateUserCodeDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsNumber()
    code: number;
}