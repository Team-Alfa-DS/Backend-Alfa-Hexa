import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({
        description: 'nombre del usuario',
        example: 'Miguel Sanchez'
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'correo del usuario',
        example: 'mrsanchez.27@gmail.com'
    })
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'contraseña del usuario',
        example: '1234567'
    })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty({
        description: 'telefono del usuario',
        example: '04241236958'
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        description: 'Imagen del perfil del usuario',
        example: 'url:'
    })
    @IsOptional()
    @IsString()
    image?: string;
    
}