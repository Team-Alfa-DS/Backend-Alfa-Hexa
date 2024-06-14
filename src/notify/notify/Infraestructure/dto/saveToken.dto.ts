import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/domain/user";
//se cambio de interfaz a clase
export class TokenDto{

    @ApiProperty({
        description: 'Token de la notificacin',
        example: 'Masdasf345'
    })
    token: string;

    @ApiProperty({
        description: 'Titulo de la notificacion',
        example: 'Subscripcion'
    })
    title: string;

    @ApiProperty({
        description: 'Desarrollo de la notificacion',
        example: 'Se ha subscrito al curso correctamente'
    })
    body: string;

    @ApiProperty({
        description: 'Id del user al que pertence al usuario',
        example: 'asdgfgr356'
    })
    userId: User;
}