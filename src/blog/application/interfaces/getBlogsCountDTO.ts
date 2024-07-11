import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { ServiceRequestDto } from "src/common/application/interfaces/IService";

export class GetBlogsCountDTO implements ServiceRequestDto {
  constructor(
    public category?: string,
    public  trainer?: string
  ){

  }
  dataToString(): string {
      return `category: ${this.category}, trainer: ${this.trainer}`;
  }
}