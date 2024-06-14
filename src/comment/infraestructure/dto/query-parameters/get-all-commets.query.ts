/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { PaginationDto } from "src/common/infraestructure/dto/entry/pagination.dto";
import { ApiProperty } from "@nestjs/swagger";


export class GetAllCommentsQueryDto extends PaginationDto { 

    @ApiProperty({
        description: 'blog al que pertenece el comentario',
        example: 'El yoga como medio para mejorar la salud'
    })
    @IsString()
    @IsOptional()
    blog?: string;

    @ApiProperty({
        description: 'leccion a la que pertenece el comentario',
        example: 'lesson 3'
    })
    @IsString()
    @IsOptional()
    lesson?: string;

}