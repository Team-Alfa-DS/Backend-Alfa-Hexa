import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/infraestructure/dto/entry/pagination.dto";


export class GetAllCommentsQueryDto extends PaginationDto { 
    
    @IsString()
    @IsOptional()
    blog?: string;

    @IsString()
    @IsOptional()
    lesson?: string;
    static Id: string;
    static page: number;
    static perPage: any;
    
}