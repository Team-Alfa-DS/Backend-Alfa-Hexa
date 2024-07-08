import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetCourseCountQueryDto {
  
  @ApiProperty({
    description: 'Categoría de los cursos a contar',
    example: 'Yoga'
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Id del entrenador de los cursos a contar',
    example: '3fcfac6c-53d1-47f1-ae9a-2351a86c5d0d'
  })
  @IsString()
  @IsOptional()
  trainer?: string;

}