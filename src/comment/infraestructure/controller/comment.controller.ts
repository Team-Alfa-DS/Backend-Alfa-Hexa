import { Body, Controller, Get, HttpException, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { OrmUserMapper } from "src/user/infraestructure/mappers/orm-mappers/orm-user.mapper";
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
import { LoggerDecorator } from "src/common/application/aspects/loggerDecorator";
import { ILogger } from "src/common/application/logger/logger.interface";
import { NestLogger } from "src/common/infraestructure/logger/nest-logger";
import { OrmBlogCommentRepository } from "../repositories/blog/orm-comment.repository";
import { IBlogCommentRepository } from "src/comment/domain/repositories/blog/comment-blog-repository.interface";
import { OrmBlogCommentEntity } from "../entities/orm-entities/orm-comment.blog.entity";
import { ExceptionMapper } from "src/common/infraestructure/mappers/exception-mapper";
import { OrmLessonCommentMapper } from "../../../course/infraestructure/mappers/orm-mappers/orm-comment-lesson.mapper";
import { OdmBlogCommentMapper } from "../../../blog/infraestructure/mapper/odm-comment-blog.mapper";
import { OdmLessonCommentEntity } from "../entities/odm-entities/odm-comment.lesson.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { OdmLessonCommentMapper } from "../../../course/infraestructure/mappers/odm-mappers/odm-comment-lesson.mapper";
import { OdmBlogCommentEntity } from "../entities/odm-entities/odm-comment.blog.entity";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { OdmLessonEntity } from "src/course/infraestructure/entities/odm-entities/odm-lesson.entity";
import { OdmCourseRepository } from "src/course/infraestructure/repositories/OdmCourse.repository";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { EventManagerSingleton } from "src/common/infraestructure/events/event-manager/event-manager-singleton";
import { CreateCommentLessonEvent } from "src/course/infraestructure/events/synchronize/create-commentLesson.event";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { OdmBlogRepository } from "src/blog/infraestructure/repositories/odmBlog.repository";
import { OdmBlogMapper } from "src/blog/infraestructure/mapper/odmBlog.mapper";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";
import { OrmBlogCommentMapper } from "src/blog/infraestructure/mapper/orm-comment-blog.mapper";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";


@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@UseGuards(JwtAuthGuard)
@ApiTags( 'Comments' )
@Controller( 'comment' )
export class CommentController{

    private eventPublisher: IEventPublisher = EventManagerSingleton.getInstance();
    private readonly idGenerator: IIdGen = new UuidGen();
    
    //*Mappers
    private OdmcommentLessonMapper = new OdmLessonCommentMapper();
    private commentBlogMapper: OrmBlogCommentMapper = new OrmBlogCommentMapper();
    private commentLessonMapper: OrmLessonCommentMapper = new OrmLessonCommentMapper();
    private userMapper: OrmUserMapper = new OrmUserMapper();

    //* Repositorios
    

    private readonly commentBlogRepository: IBlogCommentRepository = new OrmBlogCommentRepository(
        this.commentBlogMapper,
        PgDatabaseSingleton.getInstance()
    );

    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper,
        PgDatabaseSingleton.getInstance()
    );

    private readonly blogRepository: IBlogRepository = new OrmBlogRepository(
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
    
    constructor(@InjectModel('course') courseModel: Model<OdmCourseEntity>, 
                @InjectModel('category') categoryModel: Model<OdmCategoryEntity>,
                @InjectModel('trainer') trainerModel: Model<OdmTrainerEntity>,
                @InjectModel('tag') tagModel: Model<OdmTagEntity>,
                @InjectModel('lesson') lessonModel: Model<OdmLessonEntity>,
                @InjectModel('commentLesson') commentLessonModel: Model<OdmLessonCommentEntity>,
                @InjectModel('commentBlog') commentBlogModel: Model<OdmBlogCommentEntity>,
                @InjectModel('blog') blogModel: Model<OdmBlogEntity>,
                @InjectModel('user') userModel: Model<OdmUserEntity>){

        const OdmcommentBlogMapper = new OdmBlogCommentMapper(userModel, blogModel, commentBlogModel,trainerModel);

        const odmBlogRepositoryInstance = new OdmBlogRepository(
            new OdmBlogMapper(userModel,blogModel,commentBlogModel,trainerModel), 
            blogModel, 
            commentBlogModel);
        
        
                @InjectModel('lesson_comment') commentLessonModel: Model<OdmLessonCommentEntity>,
                @InjectModel('blog_comment') commentBlogModel: Model<OdmBlogCommentEntity>){

                    
                    
        const OdmCourseRepositoryInstance = new OdmCourseRepository(
            courseModel, 
            categoryModel, 
            trainerModel, 
            tagModel, 
            lessonModel, 
            commentLessonModel,
            userModel
        );
        
        this.eventPublisher.subscribe('CommentPosted', [new CreateCommentLessonEvent(OdmCourseRepositoryInstance)]);

        this.getCommentBlogService = new LoggerDecorator(
            new GetCommentBlogService(
                odmBlogRepositoryInstance
            ),
            this.logger
        );
        this.getCommentLessonService = new LoggerDecorator(
            new GetCommentLessonService(
                this.courseRepository
            ),
            this.logger
        );
        this.registerLessonCommentService = new LoggerDecorator(
            new ServiceDBLoggerDecorator(
                new RegisterLessonCommentServices(
                    this.userRepository,
                    this.courseRepository,
                    this.transactionHandler,
                    this.eventPublisher,
                    this.idGenerator
                ),
                this.auditRepository
            ),
            this.logger
        );
        this.registerBlogCommentService = new LoggerDecorator(
            new ServiceDBLoggerDecorator(
                new RegisterBlogCommentServices(
                    odmBlogRepositoryInstance,
                    this.userRepository,
                    this.blogRepository,
                    this.transactionHandler,
                    this.idGenerator,
                    this.eventPublisher
                ),
                this.auditRepository
            ),
            this.logger
        );

    
    }
    
    @Get('/many')
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
            const data = new GetBlogCommentsServiceRequestDto(commentsQueryParams.blog, {page: commentsQueryParams.page, perPage: commentsQueryParams.perpage}, req.user.tokenUser.id)
            const result = await this.getCommentBlogService.execute( data );
            return result.Value;

        }else {
            const data = new GetLessonCommentsServiceRequestDto(commentsQueryParams.lesson, {page: commentsQueryParams.page, perPage: commentsQueryParams.perpage}, req.user.tokenUser.id);

            const result = await this.getCommentLessonService.execute( data );
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

        if (addCommentEntryDto.targetType.toUpperCase() === "LESSON") return await this.registerLessonCommentService.execute( data );

        if (addCommentEntryDto.targetType.toUpperCase() === "BLOG") return await this.registerBlogCommentService.execute( data );
        
    }

}