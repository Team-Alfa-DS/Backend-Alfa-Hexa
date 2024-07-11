import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class GetManyBlogsDTO implements ServiceRequestDto {
  constructor(
    public filter?: string,
    public category?: string,
    public trainer?: string,
    public page?: number,
    public perpage?: number
  ){

  }
  dataToString(): string {
      return `filter: ${this.filter}, category: ${this.category}, trainer: ${this.trainer}, page: ${this.page}, perpage: ${this.perpage}`;
  }
}