import { Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetAllCommentsQueryDto } from "../dto/query-parameters/get-all-commets.query";
import { DataSource } from "typeorm";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";
import { GetBlogCommentsServiceDto } from "src/comment/application/dto/blog/blog-comment.response.dto";
import { GetLessonCommentsServiceDto } from "src/comment/application/dto/lesson/lesson-comment.response.dto";
import { TransactionHandler } from '../../../common/infraestructure/database/transaction-handler';
import { DataSourceSingleton } from "src/common/infraestructure/database/config";
import { GetCommentBlogService } from "src/comment/application/service/query/get-comment-blog.service";
import { OrmCommentMapper } from "../mapper/orm-comment.mapper";
import { OrmCommentRepository } from "../repositories/orm-comment.repository";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { GetCommentLessonService } from "src/comment/application/service/query/get-comment-lesson.service";
import { AddCommentEntryDto } from "../dto/entry/add-commet.dto";
import { AddCommentToServiceDto } from "src/comment/application/dto/blog/add-comment-to-service.dto";
import { RegisterLessonCommentServices } from "src/comment/application/service/command/register-lesson-comment.service";
import { RegisterBlogCommentServices } from "src/comment/application/service/command/register-blog-comment.service";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { UuidGen } from "src/common/infraestructure/id-gen/uuid-gen";


@ApiTags( 'Comments' )
@Controller( 'Comments' )
export class CommentController{


    private readonly idGenerator: IIdGen

    private  commentMapper: OrmCommentMapper = new OrmCommentMapper();

    private readonly commentRepository: ICommentRepository = new OrmCommentRepository(
        this.commentMapper,
        DataSourceSingleton.getInstance()
    );
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
            this.transactionHandler,
            this.idGenerator,
            //this.encryptor
        );
        this.registerBlogCommentService = new RegisterBlogCommentServices(
            this.commentRepository,
            this.transactionHandler,
            this.idGenerator,
            //this.encryptor
        );

        this.idGenerator = new UuidGen();
    }
    
    @Get(":many")
    async getCommets (user: UserEntity, @Query() commentsQueryParams: GetAllCommentsQueryDto){
        if(commentsQueryParams.blog){
            const data: GetBlogCommentsServiceDto = {
                blogId: GetAllCommentsQueryDto.Id,
                pagination: {page: GetAllCommentsQueryDto.page, perPage: GetAllCommentsQueryDto.perPage} ,
                userId: user.id
            }
            
            return this.getCommentBlogService.execute( data );

        }else if(commentsQueryParams.lesson){
            const data: GetLessonCommentsServiceDto = {
                lessonId: GetAllCommentsQueryDto.Id,
                pagination: {page: GetAllCommentsQueryDto.page, perPage: GetAllCommentsQueryDto.perPage} ,
                userId: user.id
            }

            return this.getCommentLessonService.execute( data );
        }
    }

    @Post( ":release" )
    async addComment(user: UserEntity, @Query() addCommentEntryDto: AddCommentEntryDto){
        const data: AddCommentToServiceDto = {
            targetId: addCommentEntryDto.target,
            body: addCommentEntryDto.body,
            userId: user.id
        } 


        if (addCommentEntryDto.targetType === "LESSON"){
            this.registerLessonCommentService.execute( data );

        }else(addCommentEntryDto.targetType === "BLOG")
        {
            this.registerBlogCommentService.execute( data );
        }
        
    }

}