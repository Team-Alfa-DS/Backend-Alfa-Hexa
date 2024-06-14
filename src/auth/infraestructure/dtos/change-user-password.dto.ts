import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class ChangeUserPasswordDto {

    @ApiProperty({
        description: 'correo del usuario que desea cambiar la contraseña',
        example: 'lsDominguez@gmail.com'
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'codigo de verificación',
        example: '563214'
    })
    @IsNumber()
    code: number;
    @ApiProperty({
        description: 'Nueva contraseña',
        example: '12457ls'
    })
    @IsString()
    password: string;
}