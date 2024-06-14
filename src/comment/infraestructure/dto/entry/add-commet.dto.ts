import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, IsUUID, MinLength } from "class-validator";

export class AddCommentEntryDto {

    @ApiProperty({
        description: 'target del comentario',
        example: ' '
    })
    @IsString()
    @IsUUID()
    target: string; 


    @ApiProperty({
        description: 'Tipo de Target',
        example: 'Blog'
    })
    @IsString()
    @IsIn(['LESSON','BLOG'])
    targetType: string;


    @ApiProperty({
        description: 'contenido del comentario',
        example: 'Me gusto bastante la leccion'
    })
    @IsString()
    @MinLength(1)
    body: string;
}