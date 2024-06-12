import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetManyCoursesQueryDto {
  @ApiProperty({
    description: 'filtro del curso',
    example: 'Relajación'
  })
  @IsOptional()
  @IsString()
  filter?: string;


  @ApiProperty({
    description: 'categoria del curso',
    example: 'Yoga'
  })
  @IsOptional()
  @IsString()
  category?: string;


  @ApiProperty({
    description: 'Entrenador asignado al curso',
    example: 'Ana Montilla'
  })
  @IsOptional()
  @IsString()
  trainer?: string;


  @ApiProperty({
    description: 'nombre del usuario',
    example: '1'
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: 'nombre del usuario',
    example: 'Miguel Sanchez'
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perpage?: number;
}