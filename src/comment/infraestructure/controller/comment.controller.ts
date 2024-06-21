import { Body, Controller, Get, HttpException, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { OrmCommentMapper } from "../mapper/orm-comment.mapper";
import { OrmUserMapper } from "src/user/infraestructure/mappers/orm-user.mapper";
import { CourseMapper } from "src/course/infraestructure/mappers/course.mapper";
import { OrmCommentRepository } from "../repositories/orm-comment.repository";
import { OrmUserRepository } from "src/user/infraestructure/repositories/orm-user.repository";
import { TOrmCourseRepository } from "src/course/infraestructure/repositories/TOrmCourse.repository";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
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
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
import { ExceptionLoggerDecorator } from "src/common/application/aspects/exceptionLoggerDecorator";
import { ILogger } from "src/common/application/logger/logger.interface";
import { NestLogger } from "src/common/infraestructure/logger/nest-logger";
import { CommentEntity } from "../entities/comment.entity";

@UseGuards(JwtAuthGuard)
@ApiTags( 'Comments' )
@Controller( 'Comments' )
export class CommentController{


    private readonly idGenerator: IIdGen = new UuidGen();
    
    //*Mappers
    private commentMapper: OrmCommentMapper = new OrmCommentMapper();
    private userMapper: OrmUserMapper = new OrmUserMapper();
    private courseMapper: CourseMapper = new CourseMapper();

    //* Repositorios
    private readonly commentRepository: ICommentRepository = new OrmCommentRepository(
        this.commentMapper,
        DatabaseSingleton.getInstance()
    );

    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper,
        DatabaseSingleton.getInstance()
    );

    private readonly blogRepository = new OrmBlogRepository(
        DatabaseSingleton.getInstance()
    );

    private readonly courseRepository: TOrmCourseRepository = new TOrmCourseRepository(
        DatabaseSingleton.getInstance()
    );

    //*transactionHandler
    private readonly transactionHandler = new TransactionHandler(
        DatabaseSingleton.getInstance().createQueryRunner()
    );

    private readonly auditRepository = new OrmAuditRepository(
        DatabaseSingleton.getInstance()
    );
    private readonly logger: ILogger = new NestLogger();
    //private readonly encryptor: IEncryptor = new BcryptEncryptor();
    
    
    private readonly getCommentBlogService: IService<GetBlogCommentsServiceRequestDto, GetBlogCommentServiceResponseDto>;
    private readonly getCommentLessonService: IService<GetLessonCommentsServiceRequestDto, GetLessonCommentServiceResponseDto>;
    private readonly registerLessonCommentService: IService<AddCommentToServiceRequestDto, AddCommentToServiceResponseDto>;
    private readonly registerBlogCommentService: IService<AddCommentToServiceRequestDto, AddCommentToServiceResponseDto>;
    
    constructor() {

        this.getCommentBlogService = new ExceptionLoggerDecorator(
            new GetCommentBlogService(
                this.commentRepository,
                this.transactionHandler,
                //this.encryptor
            ),
            this.logger
        );
        this.getCommentLessonService = new ExceptionLoggerDecorator(
            new GetCommentLessonService(
                this.commentRepository,
                this.transactionHandler,
                //this.encryptor
            ),
            this.logger
        );
        this.registerLessonCommentService = new ExceptionLoggerDecorator(
            new ServiceDBLoggerDecorator(
                new RegisterLessonCommentServices(
                    this.commentRepository,
                    this.userRepository,
                    this.courseRepository,
                    this.transactionHandler,
                    this.idGenerator,
                    //this.encryptor
                ),
                this.auditRepository
            ),
            this.logger
        );
        this.registerBlogCommentService = new ExceptionLoggerDecorator(
            new ServiceDBLoggerDecorator(
                new RegisterBlogCommentServices(
                    this.commentRepository,
                    this.userRepository,
                    this.blogRepository,
                    this.transactionHandler,
                    this.idGenerator,
                    //this.encryptor
                ),
                this.auditRepository
            ),
            this.logger
        );

    
    }
    
    @Get(':many')
    @ApiCreatedResponse({
        description: 'se retorno todos los comentarios correctamente',
        type: CommentEntity,
    })
    @ApiBadRequestResponse({
        description: 'No existen comentarios.'
    })
    @ApiQuery({name:'blog', required: false})
    @ApiQuery({name:'lesson', required: false})
    async getCommets (@Request() req: JwtRequest,
    @Query() commentsQueryParams: GetAllCommentsQueryDto){
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
        type: CommentEntity,
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