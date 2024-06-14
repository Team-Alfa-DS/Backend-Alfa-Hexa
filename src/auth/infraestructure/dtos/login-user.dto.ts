import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        description: 'Correo del usuario',
        example: 'mrsanchez.27@gmail.com'
      })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '142536'
      })
    @IsString()
    password: string;
}