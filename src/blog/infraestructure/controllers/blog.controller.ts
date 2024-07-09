import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetAllBlogService } from "src/blog/application/getAllBlog.service";
import { GetBlogByIdService } from "src/blog/application/getBlogById.service";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
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
import { OrmBlogEntity } from "../entities/orm-entities/orm-blog.entity";
import { LoggerDecorator } from "src/common/application/aspects/loggerDecorator";
import { NestLogger } from "src/common/infraestructure/logger/nest-logger";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";

@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@UseGuards(JwtAuthGuard)
@ApiTags('Blog') 
@Controller('blog')
export class BlogController {
    private readonly getAllBlogService: IService<GetAllBlogsRequestDTO, GetAllBlogsResponseDTO>;
    private readonly getBlogByIdService: IService<GetBlogByIdRequestDTO, GetBlogByIdResponseDTO>;
    private trainerMapper: OrmTrainerMapper = new OrmTrainerMapper();

    constructor() {
        const blogRepositoryInstance = new OrmBlogRepository(PgDatabaseSingleton.getInstance());
        const trainerRepositoryInstance = new OrmTrainerRepository(this.trainerMapper, PgDatabaseSingleton.getInstance());
        const categoryRepositoryInstance = new OrmCategoryRepository(new OrmCategoryMapper, PgDatabaseSingleton.getInstance());
        const logger = new NestLogger();
        this.getAllBlogService = new LoggerDecorator(
            new GetAllBlogService(blogRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance),
            logger
        );
        this.getBlogByIdService = new LoggerDecorator(
            new GetBlogByIdService(blogRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance),
            logger
        );


    }

    @Get('one/:id')
    @ApiCreatedResponse({
        description: 'se encontro un blog con esa id',
        type: OrmBlogEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se encontro un blog con esa id. Intente de nuevo'
    })
    async getBlogById(@Param('id', ParseUUIDPipe) blogId: string) {
        const result: Result<GetBlogByIdResponseDTO> =  await this.getBlogByIdService.execute(new GetBlogByIdRequestDTO(blogId));
        if (result.Value)
            return result.Value
        return { message: result.Error.message};
    }

    @Get('many')
    @ApiCreatedResponse({
        description: 'se retorno todos los blog',
        type: OrmBlogEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se encontraron blogs. Agregue algunos'
    })
    async  getAllBlogs() {
        const result: Result<GetAllBlogsResponseDTO>  =  await this.getAllBlogService.execute(new GetAllBlogsRequestDTO());
        if (result.Value)
            return result.Value.blogs
        return { message: result.Error.message };
    }
}