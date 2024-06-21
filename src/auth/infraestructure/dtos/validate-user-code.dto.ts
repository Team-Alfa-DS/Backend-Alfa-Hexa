import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class ValidateUserCodeDto {
    @ApiProperty({
        description: 'Correo del usuario que desea recuperar contraseña',
        example: 'lrDominguez@gmail.com'
      })
    @IsString()
    @IsEmail()
    email: string;


    @ApiProperty({
        description: 'Codigo de verificación enviado al correo',
        example: '568127'
      })
    @IsNumber()
    code: number;
}