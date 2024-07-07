import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { UserId } from "src/user/domain/value-objects/user-id";

export class GetManyTrainerQueryDto {
  @ApiProperty({
    description: 'bandera del userfollow',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  userfollow?: boolean;

  @ApiProperty({
    description: 'Usuario al que se le sigue el trainer',
    example: 'false'
  })
  @IsOptional()
  @IsString()
  user?: UserId

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