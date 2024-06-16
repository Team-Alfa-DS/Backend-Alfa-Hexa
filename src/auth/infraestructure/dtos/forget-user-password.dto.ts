import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ForgetUserPasswordDto {

    @ApiProperty({
        description: 'Correo del usuario que desea recuperar contraseña',
        example: 'lsDominguez@gmail.com'
      })
    @IsEmail()
    @IsString()
    email: string;
}