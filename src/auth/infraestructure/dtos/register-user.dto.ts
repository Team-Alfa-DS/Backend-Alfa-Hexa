/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { UserRole } from "src/user/domain/enums/role-user.type";

export class RegisterUserDto {
    @ApiProperty({
        description: 'correo del usuario',
        example: 'mrsanchez.27@gmail.com'
    })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'nombre del usuario',
        example: 'Miguel Sanchez'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'contraseña del usuario',
        example: '1234567'
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Telefono del usuario',
        example: '04241594826'
    })
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    phone: string;

    @ApiProperty({
        description: 'tipo de usuario',
        example: 'CLIENT'
    })
    @IsEnum(UserRole)
    type: UserRole;
}