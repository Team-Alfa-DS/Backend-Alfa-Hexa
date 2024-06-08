import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetManyCoursesQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  filter?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  trainer?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perpage?: number;
}