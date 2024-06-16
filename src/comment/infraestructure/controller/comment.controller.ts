import { Body, Controller, Get, HttpException, Post, Query, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrmCommentMapper } from "../mapper/orm-comment.mapper";
import { OrmUserMapper } from "src/user/infraestructure/mappers/orm-user.mapper";
import { CourseMapper } from "src/course/infraestructure/mappers/course.mapper";
import { OrmCommentRepository } from "../repositories/orm-comment.repository";
import { OrmUserRepository } from "src/user/infraestructure/repositories/orm-user.repository";
import { TOrmCourseRepository } from "src/course/infraestructure/repositories/TOrmCourse.repository";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { GetAllCommentsQueryDto } from "../dto/query-parameters/get-all-commets.query";
import { GetBlogCommentsServiceDto } from "src/comment/application/dto/blog/blog-comment.response.dto";
import { GetLessonCommentsServiceDto } from "src/comment/application/dto/lesson/lesson-comment.response.dto";
import { TransactionHandler } from '../../../common/infraestructure/database/transaction-handler';
import { DataSourceSingleton } from "src/common/infraestructure/database/config";
import { GetCommentBlogService } from "src/comment/application/service/query/get-comment-blog.service";
import { GetCommentLessonService } from "src/comment/application/service/query/get-comment-lesson.service";
import { AddCommentEntryDto } from "../dto/entry/add-commet.dto";
import { AddCommentToServiceDto } from "src/comment/application/dto/blog/add-comment-to-service.dto";
import { RegisterLessonCommentServices } from "src/comment/application/service/command/register-lesson-comment.service";
import { RegisterBlogCommentServices } from "src/comment/application/service/command/register-blog-comment.service";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { UuidGen } from "src/common/infraestructure/id-gen/uuid-gen";
import { JwtRequest } from "src/common/infraestructure/types/jwt-request.type";
import { OrmBlogRepository } from "src/blog/infraestructure/repositories/ormBlog.repository";


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
        DataSourceSingleton.getInstance()
    );

    private readonly userRepository: OrmUserRepository = new OrmUserRepository(
        this.userMapper,
        DataSourceSingleton.getInstance()
    );

    private readonly blogRepository = new OrmBlogRepository(
        DataSourceSingleton.getInstance()
    );

    private readonly courseRepository: TOrmCourseRepository = new TOrmCourseRepository(
        DataSourceSingleton.getInstance()
    );

    //*transactionHandler
    private readonly transactionHandler = new TransactionHandler(
        DataSourceSingleton.getInstance().createQueryRunner()
    );


    //private readonly encryptor: IEncryptor = new BcryptEncryptor();
    
    
    private readonly getCommentBlogService: GetCommentBlogService;
    private readonly getCommentLessonService: GetCommentLessonService;
    private readonly registerLessonCommentService: RegisterLessonCommentServices;
    private readonly registerBlogCommentService:RegisterBlogCommentServices;
    
    constructor() {

        this.getCommentBlogService = new GetCommentBlogService(
            this.commentRepository,
            this.transactionHandler,
            //this.encryptor
        );
        this.getCommentLessonService = new GetCommentLessonService(
            this.commentRepository,
            this.transactionHandler,
            //this.encryptor
        );
        this.registerLessonCommentService = new RegisterLessonCommentServices(
            this.commentRepository,
            this.userRepository,
            this.courseRepository,
            this.transactionHandler,
            this.idGenerator,
            //this.encryptor
        );
        this.registerBlogCommentService = new RegisterBlogCommentServices(
            this.commentRepository,
            this.userRepository,
            this.blogRepository,
            this.transactionHandler,
            this.idGenerator,
            //this.encryptor
        );

    
    }
    
    @Get(':many')
    async getCommets (@Request() req: JwtRequest,
    @Query() commentsQueryParams: GetAllCommentsQueryDto){
        if(commentsQueryParams.blog !== undefined && commentsQueryParams.blog !== null && commentsQueryParams.blog !== ""){
            const data: GetBlogCommentsServiceDto = {
                blogId: commentsQueryParams.blog,
                pagination: {page: commentsQueryParams.page, perPage: commentsQueryParams.perPage} ,
                userId: req.user.tokenUser.id
            }
            const result = await this.getCommentBlogService.execute( data );

            if (!result.isSuccess) return new HttpException(result.Message, result.StatusCode);

            return result.Value;

        }else {
            const data: GetLessonCommentsServiceDto = {
                lessonId: commentsQueryParams.lesson,
                pagination: {page: commentsQueryParams.page, perPage: commentsQueryParams.perPage} ,
                userId: req.user.tokenUser.id
            }

            const result = await this.getCommentLessonService.execute( data );

            if (!result.isSuccess) return new HttpException(result.Message, result.StatusCode);

            return result.Value;
        }
    }

    @Post( '/release' )
    async addComment(@Request() req: JwtRequest, 
    @Body() addCommentEntryDto: AddCommentEntryDto){
        const data: AddCommentToServiceDto = {
            targetId: addCommentEntryDto.target,
            body: addCommentEntryDto.body,
            userId: req.user.tokenUser.id
        }

        if (addCommentEntryDto.targetType == "LESSON") return await this.registerLessonCommentService.execute( data );

        if (addCommentEntryDto.targetType == "BLOG") return await this.registerBlogCommentService.execute( data );
        
    }

}