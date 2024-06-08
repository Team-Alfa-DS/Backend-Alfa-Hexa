import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { PaginationDto } from "src/common/infraestructure/dto/entry/pagination.dto";


export class GetAllCommentsQueryDto extends PaginationDto { 

    @IsString()
    @IsOptional()
    blog?: string;

    @IsString()
    @IsOptional()
    lesson?: string;

}