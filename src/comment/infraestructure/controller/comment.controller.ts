import { Controller, Inject, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetAllCommentsQueryDto } from "../dto/query-parameters/get-all-commets.query";
import { DataSource } from "typeorm";
import { User } from "src/user/infraestructure/entities/user.entity";
import { GetBlogCommentsServiceDto } from "src/comment/application/dto/blog/blog-comment.response.dto";
import { GetLessonCommentsServiceDto } from "src/comment/application/dto/lesson/lesson-comment.response.dto";
import { TransactionHandler } from '../../../common/infraestructure/database/transaction-handler';
import { DataSourceSingleton } from "src/common/infraestructure/database/config";
import { GetCommentBlogService } from "src/comment/application/service/query/get-comment-blog.service";
import { OrmCommentMapper } from "../mapper/orm-comment.mapper";
import { OrmCommentRepository } from "../repositories/orm-comment.repository";


@ApiTags( 'Comment' )
@Controller( 'Comment' )
export class CommentController{

    private  commentMapper: OrmCommentMapper = new OrmCommentMapper();
    private readonly commentRepository: OrmCommentRepository = new OrmCommentRepository(
        this.commentMapper,
        DataSourceSingleton.getInstance()
    );
    private readonly transactionHandler = new TransactionHandler(
        DataSourceSingleton.getInstance().createQueryRunner()
    );
    //private readonly encryptor: IEncryptor = new BcryptEncryptor();
    
    
    private readonly getCommentBlogService: GetCommentBlogService;
    
    constructor() {
        this.getCommentBlogService = new GetCommentBlogService(
            this.commentRepository,
            this.transactionHandler,
        );
    }
    
    async getCommets (user:User, @Query() commentsQueryParams: GetAllCommentsQueryDto){
        if(commentsQueryParams.blog){
            const data: GetBlogCommentsServiceDto = {
                blogId: GetAllCommentsQueryDto.Id,
                pagination: {page: GetAllCommentsQueryDto.page, perPage: GetAllCommentsQueryDto.perPage} ,
                userId: user.id
            }
            
            const service = new GetCommentBlogService.execute( data );

        }else if(commentsQueryParams.lesson){
            const data: GetLessonCommentsServiceDto = {
                lessonId: GetAllCommentsQueryDto.Id,
                pagination: {page: GetAllCommentsQueryDto.page, perPage: GetAllCommentsQueryDto.perPage} ,
                userId: user.id
            }

            const service = 3;
        }
    }

    

}