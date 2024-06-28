import { Body, Controller, Get, HttpException, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { OrmBlogCommentMapper } from "../mapper/blog/orm-comment-blog.mapper";
import { OrmLessonCommentMapper } from "../mapper/lesson/orm-comment-lesson.mapper";
import { OrmUserMapper } from "src/user/infraestructure/mappers/orm-user.mapper";
import { OrmUserRepository } from "src/user/infraestructure/repositories/orm-user.repository";
import { TOrmCourseRepository } from "src/course/infraestructure/repositories/TOrmCourse.repository";
import { GetAllCommentsQueryDto } from "../dto/query-parameters/get-all-commets.query";
import { GetBlogCommentServiceResponseDto, GetBlogCommentsServiceRequestDto } from "src/comment/application/dto/blog/blog-comment.response.dto";
import { TransactionHandler } from '../../../common/infraestructure/database/transaction-handler';
import { GetCommentBlogService } from "src/comment/application/service/query/get-comment-blog.service";
import { GetCommentLessonService } from "src/comment/application/service/query/get-comment-lesson.service";
import { AddCommentEntryDto } from "../dto/entry/add-commet.dto";
import { AddCommentToServiceRequestDto, AddCommentToServiceResponseDto } from "src/comment/application/dto/blog/add-comment-to-service.dto";
import { RegisterLessonCommentServices } from "src/comment/application/service/command/register-lesson-comment.service";
import { RegisterBlogCommentServices } from "src/comment/application/service/command/register-blog-comment.service";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { UuidGen } from "src/common/infraestructure/id-gen/uuid-gen";
import { JwtRequest } from "src/common/infraestructure/types/jwt-request.type";
import { OrmBlogRepository } from "src/blog/infraestructure/repositories/ormBlog.repository";
import { OrmAuditRepository } from "src/common/infraestructure/repository/orm-audit.repository";
import { IService } from "src/common/application/interfaces/IService";
import { ServiceDBLoggerDecorator } from "src/common/application/aspects/serviceDBLoggerDecorator";
import { GetLessonCommentServiceResponseDto, GetLessonCommentsServiceRequestDto } from "src/comment/application/dto/lesson/lesson-comment.response.dto";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
import { ExceptionLoggerDecorator } from "src/common/application/aspects/exceptionLoggerDecorator";
import { ILogger } from "src/common/application/logger/logger.interface";
import { NestLogger } from "src/common/infraestructure/logger/nest-logger";
import { OrmBlogCommentRepository } from "../repositories/blog/orm-comment.repository";
import { IBlogCommentRepository } from "src/comment/domain/repositories/blog/comment-blog-repository.interface";
import { ILessonCommentRepository } from "src/comment/domain/repositories/lesson/comment-lesson-repository.interface";
import { OrmLessonCommentRepository } from "../repositories/lesson/orm-comment.repository";
import { OrmBlogCommentEntity } from "../entities/orm-entities/orm-comment.blog.entity";
import { OrmLessonCommentEntity } from "../entities/orm-entities/orm-comment.lesson.entity";






@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@UseGuards(JwtAuthGuard)
@ApiTags( 'Comments' )
@Controller( 'comments' )
export class CommentController{


    private readonly idGenerator: IIdGen = new UuidGen();
    
    //*Mappers
    private commentBlogMapper: OrmBlogCommentMapper = new OrmBlogCommentMapper();
    private commentLessonMapper: OrmLessonCommentMapper = new OrmLessonCommentMapper();
    private userMapper: OrmUserMapper = new OrmUserMapper();

    //* Repositorios
    private readonly commentBlogRepository: IBlogCommentRepository = new OrmBlogCommentRepository(
        this.commentBlogMapper,
        PgDatabaseSingleton.getInstance()
    );

    private readonly commentLessonRepository: ILessonCommentRepository = new OrmLessonCommentRepository(
        this.commentLessonMapper,
        PgDatabaseSingleton.getInstance()
    );

    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper,
        PgDatabaseSingleton.getInstance()
    );

    private readonly blogRepository = new OrmBlogRepository(
        PgDatabaseSingleton.getInstance()
    );

    private readonly courseRepository: TOrmCourseRepository = new TOrmCourseRepository(
        PgDatabaseSingleton.getInstance()
    );

    //*transactionHandler
    private readonly transactionHandler = new TransactionHandler(
        PgDatabaseSingleton.getInstance().createQueryRunner()
    );

    private readonly auditRepository = new OrmAuditRepository(
        PgDatabaseSingleton.getInstance()
    );
    private readonly logger: ILogger = new NestLogger();
    
    
    private readonly getCommentBlogService: IService<GetBlogCommentsServiceRequestDto, GetBlogCommentServiceResponseDto>;
    private readonly getCommentLessonService: IService<GetLessonCommentsServiceRequestDto, GetLessonCommentServiceResponseDto>;
    private readonly registerLessonCommentService: IService<AddCommentToServiceRequestDto, AddCommentToServiceResponseDto>;
    private readonly registerBlogCommentService: IService<AddCommentToServiceRequestDto, AddCommentToServiceResponseDto>;
    
    constructor() {

        this.getCommentBlogService = new ExceptionLoggerDecorator(
            new GetCommentBlogService(
                this.commentBlogRepository,
                this.transactionHandler
            ),
            this.logger
        );
        this.getCommentLessonService = new ExceptionLoggerDecorator(
            new GetCommentLessonService(
                this.commentLessonRepository,
                this.transactionHandler
            ),
            this.logger
        );
        this.registerLessonCommentService = new ExceptionLoggerDecorator(
            new ServiceDBLoggerDecorator(
                new RegisterLessonCommentServices(
                    this.commentLessonRepository,
                    this.userRepository,
                    this.courseRepository,
                    this.transactionHandler,
                    this.idGenerator
                ),
                this.auditRepository
            ),
            this.logger
        );
        this.registerBlogCommentService = new ExceptionLoggerDecorator(
            new ServiceDBLoggerDecorator(
                new RegisterBlogCommentServices(
                    this.commentBlogRepository,
                    this.userRepository,
                    this.blogRepository,
                    this.transactionHandler,
                    this.idGenerator
                ),
                this.auditRepository
            ),
            this.logger
        );

    
    }
    
    @Get(':many')
    @ApiCreatedResponse({
        description: 'se retorno todos los comentarios correctamente',
        type: OrmBlogCommentEntity, 
    })
    @ApiBadRequestResponse({
        description: 'No existen comentarios.'
    })
    @ApiQuery({name:'blog', required: false})
    @ApiQuery({name:'lesson', required: false})
    async getCommets (@Request() req: JwtRequest,
    @Query() commentsQueryParams: GetAllCommentsQueryDto){
        
        if (( commentsQueryParams.blog && commentsQueryParams.lesson) || 
            (!commentsQueryParams.blog && !commentsQueryParams.lesson )) {
            throw new HttpException( 'Debe proporcionar exactamente un blog o una leccion', 400 );
        }
        
        if(commentsQueryParams.blog !== undefined && commentsQueryParams.blog !== null && commentsQueryParams.blog !== ""){
            const data = new GetBlogCommentsServiceRequestDto(commentsQueryParams.blog, {page: commentsQueryParams.page, perPage: commentsQueryParams.perPage}, req.user.tokenUser.id)
            const result = await this.getCommentBlogService.execute( data );

            if (!result.isSuccess) return new HttpException(result.Message, result.StatusCode);

            return result.Value;

        }else {
            const data = new GetLessonCommentsServiceRequestDto(commentsQueryParams.lesson, {page: commentsQueryParams.page, perPage: commentsQueryParams.perPage}, req.user.tokenUser.id);

            const result = await this.getCommentLessonService.execute( data );

            if (!result.isSuccess) return new HttpException(result.Message, result.StatusCode);

            return result.Value;
        }
    }

    @Post( '/release' )
    @ApiCreatedResponse({
        description: 'se agrego el comentario correctamente',
        type: OrmBlogCommentEntity,
    })
    @ApiBadRequestResponse({
        description: 'No se pudo agregar el  comentario.'
    })
    async addComment(@Request() req: JwtRequest, 
    @Body() addCommentEntryDto: AddCommentEntryDto){
        const data = new AddCommentToServiceRequestDto(addCommentEntryDto.target, req.user.tokenUser.id, addCommentEntryDto.body); 

        if (addCommentEntryDto.targetType == "LESSON") return await this.registerLessonCommentService.execute( data );

        if (addCommentEntryDto.targetType == "BLOG") return await this.registerBlogCommentService.execute( data );
        
    }

}