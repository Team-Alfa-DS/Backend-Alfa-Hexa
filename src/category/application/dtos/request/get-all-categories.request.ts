import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class GetAllCategoriesRequest implements ServiceRequestDto {

    dataToString(): string {
        return `GetAllCategoriesReq: { page: ${this.page} | perpage: ${this.perpage} }`
    }
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
      perpage?: number;
}