import { Controller, Get, Param, ParseUUIDPipe, UseGuards, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
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
import { OdmBlogRepository } from "../repositories/odmBlog.repository";
import { OdmBlogMapper } from "../mapper/odmBlog.mapper";
import { OdmBlogEntity } from "../entities/odm-entities/odm-blog.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExceptionDecorator } from "src/common/application/aspects/exceptionDecorator";
import { OdmTrainerRepository } from '../../../trainer/infraestructure/repositories/odm-trainer.repository';
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmTrainerMapper } from "src/trainer/infraestructure/mapper/odm-trainer.mapper";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { OdmBlogCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.blog.entity";
import { GetManyBlogsDTO } from "src/blog/application/interfaces/getManyBlogsDTO";
import { GetBlogsCountDTO } from "src/blog/application/interfaces/getBlogsCountDTO";
import { GetBlogsCountResponseDTO } from "src/blog/application/interfaces/getBlogsCountResponseDTO.interface";
import { GetBlogsCountService } from "src/blog/application/getBlogsCount.service";


@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@UseGuards(JwtAuthGuard)
@ApiTags('Blog') 
@Controller('blog')
export class BlogController {
    private readonly getAllBlogService: IService<GetManyBlogsDTO, GetAllBlogsResponseDTO>;
    private readonly getBlogByIdService: IService<GetBlogByIdRequestDTO, GetBlogByIdResponseDTO>;
    private readonly getBlogsCountService: IService<GetBlogsCountDTO, GetBlogsCountResponseDTO>;
    private trainerMapper: OrmTrainerMapper = new OrmTrainerMapper();

    constructor(@InjectModel('blog') blogModel: Model<OdmBlogEntity>, 
                @InjectModel('trainer') trainerModel: Model<OdmTrainerEntity>, 
                @InjectModel('category') categoryModel: Model<OdmCategoryEntity>,
                @InjectModel('user') userModel: Model<OdmUserEntity>, 
                @InjectModel('course') courseModel: Model<OdmCourseEntity>,
                @InjectModel('blog_comment') commentModel: Model<OdmBlogCommentEntity>,){

        const blogRepositoryInstance = new OrmBlogRepository(PgDatabaseSingleton.getInstance());
        const trainerRepositoryInstance = new OrmTrainerRepository(this.trainerMapper, PgDatabaseSingleton.getInstance());
        const categoryRepositoryInstance = new OrmCategoryRepository(new OrmCategoryMapper, PgDatabaseSingleton.getInstance());
        const odmBlogRepositoryInstance = new OdmBlogRepository(new OdmBlogMapper(userModel,blogModel,commentModel,trainerModel), blogModel,commentModel, userModel, trainerModel);
        const odmTrainerRepositoryInstance = new OdmTrainerRepository( trainerModel,  new OdmTrainerMapper(courseModel, blogModel, userModel), userModel);
        //const odmCategoryRepositoryInstance = new OdmCategoryEntity(categoryModel);

        const logger = new NestLogger();
        this.getAllBlogService = new LoggerDecorator(
            new GetAllBlogService(blogRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance),
            logger
        );
        this.getAllBlogService = new ExceptionDecorator(
            new LoggerDecorator(
                new GetAllBlogService(odmBlogRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance),
                logger
            )
        );
        this.getBlogByIdService = new ExceptionDecorator(
            new LoggerDecorator(
                new GetBlogByIdService(odmBlogRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance),
                logger
            )
        );
        this.getBlogsCountService = new ExceptionDecorator(
            new LoggerDecorator(
                new GetBlogsCountService(odmBlogRepositoryInstance),
                logger
            )
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
        return result.Value
    }

    @UseGuards(JwtAuthGuard)
    @Get('many')
    @ApiQuery({name: 'filter', required:false})
    @ApiQuery({name: 'category', required:false})
    @ApiQuery({name: 'trainer', required:false})
    @ApiCreatedResponse({
        description: 'se retorno todos los blog',
        type: OrmBlogEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se encontraron blogs. Agregue algunos'
    })
    @ApiBearerAuth('token')
    @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
    async  getAllBlogs(@Query()getManyBlogsDTO: GetManyBlogsDTO) {
        const result: Result<GetAllBlogsResponseDTO>  =  await this.getAllBlogService.execute(getManyBlogsDTO);
        if (result.Value)
            return result.Value.blogs
        return { message: result.Error.message };
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('count')
    @ApiQuery({name: 'category', required:false})
    @ApiQuery({name: 'trainer', required:false})
    @ApiCreatedResponse({
        description: 'se retorna la cantidad de blogs encontrados',
        type: Number,
    })
    @ApiBadRequestResponse({
        description: 'No se encontraron blogs con ese filtro.'
    })
    @ApiBearerAuth('token')
    @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
    async  getBlogsCount(@Query()getBlogsCountDTO: GetBlogsCountDTO) {
        const result: Result<GetBlogsCountResponseDTO>  =  await this.getBlogsCountService.execute(getBlogsCountDTO);
        if (result.Value)
            return result.Value
        return { message: result.Error.message };
    }

}