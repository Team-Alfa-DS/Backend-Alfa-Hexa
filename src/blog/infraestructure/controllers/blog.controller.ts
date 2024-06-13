import { Controller, Get, Param } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { GetAllBlogService } from "src/blog/application/getAllBlog.service";
import { GetBlogByIdService } from "src/blog/application/getBlogById.service";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { OrmBlogRepository } from "../repositories/ormBlog.repository";
import { OrmTrainerRepository } from "src/trainer/infraestructure/repositories/orm-trainer.repositorie";
import { OrmTrainerMapper } from "src/trainer/infraestructure/mapper/orm-trainer.mapper";
import { OrmCategoryRepository } from "src/category/infraestructure/repositories/orm-category.repository";
import { OrmCategoryMapper } from "src/category/infraestructure/mapper/orm-category.mapper";
import { Result } from "src/common/domain/result-handler/result";
import { GetAllBlogsResponseDTO } from "src/blog/application/interfaces/getAllBlogsResponseDTO.interface";
import { GetBlogByIdRequestDTO, GetBlogByIdResponseDTO } from "src/blog/application/interfaces/getBlogByIdDTOS.interface";
import { IService } from "src/common/application/interfaces/IService";
import { GetAllBlogsRequestDTO } from "src/blog/application/interfaces/getAllBlogsRequestDTO.interface";
import { ServiceDBLoggerDecorator } from "src/common/application/aspects/serviceDBLoggerDecorator";
import { OrmAuditRepository } from "src/common/infraestructure/repository/orm-audit.repository";
import { BlogEntity } from "../entities/blog.entity";



@ApiTags('Blog') 
@Controller('blog')
export class BlogController {
    private readonly getAllBlogService: IService<GetAllBlogsRequestDTO, GetAllBlogsResponseDTO>;
    private readonly getBlogByIdService: IService<GetBlogByIdRequestDTO, GetBlogByIdResponseDTO>;

    constructor() {
        const blogRepositoryInstance = new OrmBlogRepository(DatabaseSingleton.getInstance());
        const trainerRepositoryInstance = new OrmTrainerRepository(new OrmTrainerMapper(), DatabaseSingleton.getInstance());
        const categoryRepositoryInstance = new OrmCategoryRepository(new OrmCategoryMapper, DatabaseSingleton.getInstance());
        const auditRepositoryInstance = new OrmAuditRepository(
            DatabaseSingleton.getInstance()
        );
        this.getAllBlogService = new ServiceDBLoggerDecorator(
            new GetAllBlogService(blogRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance),
            auditRepositoryInstance
        );
        this.getBlogByIdService = new ServiceDBLoggerDecorator(
            new GetBlogByIdService(blogRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance),
            auditRepositoryInstance
        );


    }

    @Get('one/:id')
    @ApiCreatedResponse({
        description: 'se encontro un blog con esa id',
        type: BlogEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se encontro un blog con esa id. Intente de nuevo'
    })
    async getBlogById(@Param('id') blogId: string) {
        const result: Result<GetBlogByIdResponseDTO> =  await this.getBlogByIdService.execute(new GetBlogByIdRequestDTO(blogId));
        if (result.Value)
            return result.Value
        return result.Error
    }

    @Get('many')
    @ApiCreatedResponse({
        description: 'se retorno todos los blog',
        type: BlogEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se encontraron blogs. Agregue algunos'
    })
    async  getAllBlogs() {
        const result: Result<GetAllBlogsResponseDTO>  =  await this.getAllBlogService.execute(new GetAllBlogsRequestDTO());
        if (result.Value)
            return result.Value.blogs
        return result.Error
    }
}