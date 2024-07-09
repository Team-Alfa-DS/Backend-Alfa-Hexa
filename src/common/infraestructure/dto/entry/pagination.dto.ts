import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';


export class PaginationDto {

    @ApiProperty( { required: false, default: 10, minimum: 1 })
    @IsOptional()
    @Type( () => Number ) // enableImplicitConversions: true
    perpage?: number;
    
    @ApiProperty( { required: false, default: 0, minimum: 0 })
    @IsOptional()
    @Min(0)
    @Type( () => Number ) // enableImplicitConversions: true
    page?: number;

}