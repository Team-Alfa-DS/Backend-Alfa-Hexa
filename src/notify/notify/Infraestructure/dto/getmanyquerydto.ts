import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetManyNotifyQueryDto {
    @ApiProperty({
        description: 'donde se a comienza a contar las notificaciones',
        example: 1
})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page: number;

    @ApiProperty({
        description: 'cuantas notificaciones se desea obtener',
        example: 10
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    perpage: number;
}