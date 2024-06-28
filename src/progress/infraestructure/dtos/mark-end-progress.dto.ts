import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class MarkEndProgressDto {
    @ApiProperty({
        description: 'Id del curso',
        example: 'asdv2'
    })
    @IsString()
    @IsUUID()
    courseId: string;


    @ApiProperty({
        description: 'id de la leccion',
        example: 'vbvbv3'
    })
    @IsString()
    @IsUUID()
    lessonId: string;


    @ApiProperty({
        description: 'Atributo que marca como completado',
        example: 'True'
    })
    @IsBoolean()
    markAsCompleted: boolean;


    @ApiProperty({
        description: 'Tiempo que llevo',
        example: '1405'
    })
    @IsNumber()
    time: number //segundos

    @ApiProperty({
        description: 'tiempo total de la leccion',
        example: '1800'
    })
    @IsNumber()
    totalTime: number //segundos
}