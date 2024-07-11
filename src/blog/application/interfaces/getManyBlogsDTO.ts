import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class GetManyBlogsDTO implements ServiceRequestDto {
  dataToString(): string {
      return `filter: ${this.filter}, category: ${this.category}, trainer: ${this.trainer}, page: ${this.page}, perpage: ${this.perPage}`;
  }
  @ApiProperty({
    description: 'filtros del blog',
    example: '[Relajación]'
  })
  @IsOptional()
  @IsString()
  filter?: string;


  @ApiProperty({
    description: 'categoria del blog',
    example: 'Yoga'
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


  @ApiProperty({
    description: 'Desde donde se empiezan a contar los blogs',
    example: '1'
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;
  
  @ApiProperty({
    description: 'Cantidad de blogs que deseas recibir ',
    example: '1'
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;
}