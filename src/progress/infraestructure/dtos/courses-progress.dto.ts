import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class CoursesProgressDto {

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    perpage?: number;
}