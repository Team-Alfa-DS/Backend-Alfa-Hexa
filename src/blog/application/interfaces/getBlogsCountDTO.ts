import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class GetBlogsCountDTO implements ServiceRequestDto {
  dataToString(): string {
      return `category: ${this.category}, trainer: ${this.trainer}`;
  }

  @ApiProperty({
    description: 'Id categoria del blog',
    example: '3fcfac6c-53d1-47f1-ae9a-2351a86c5d0d'
  })
  @IsOptional()
  @IsString()
  category?: string;


  @ApiProperty({
    description: 'Id del entrenador de los blogs a buscar',
    example: '3fcfac6c-53d1-47f1-ae9a-2351a86c5d0d'
  })
  @IsOptional()
  @IsString()
  trainer?: string;

}