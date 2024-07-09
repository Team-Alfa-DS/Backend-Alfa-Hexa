import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class GetManyTrainerQueryDto {
  @ApiProperty({
    description: 'bandera del userfollow',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({value})=> value === 'true')
  userfollow?: boolean;

  @ApiProperty({
    description: 'Desde donde se empiezan a contar los trainers',
    example: '0'
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;
  
  @ApiProperty({
    description: 'Cantidad de trainers que deseas recibir ',
    example: '1'
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perpage?: number;
}