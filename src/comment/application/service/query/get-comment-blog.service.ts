import { IApplicationService } from "src/common/application-service.interface/aplication-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { BlogComment, GetBlogCommentServiceResponseDto, GetBlogCommentsServiceRequestDto } from "../../dto/blog/blog-comment.response.dto";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Comment } from "src/comment/domain/Comment";
import { IService } from "src/common/application/interfaces/IService";
import { response } from "express";

export class GetCommentBlogService extends IService<GetBlogCommentsServiceRequestDto, GetBlogCommentServiceResponseDto>{
    
    private readonly commentRepository: ICommentRepository;
    private readonly transactionHandler: ITransactionHandler;
    //private readonly encryptor: IEncryptor;

    constructor(
        commentRepository: ICommentRepository,
        transactionHandler: ITransactionHandler,
        //encryptor: IEncryptor
    ){
        super();
        this.commentRepository = commentRepository;
        this.transactionHandler = transactionHandler;
        //this.encryptor = encryptor;
    }
    
    async execute(data : GetBlogCommentsServiceRequestDto): Promise<Result<GetBlogCommentServiceResponseDto>> {
        if (!data.pagination.page) data.pagination.page = 0;
        
        const comments = await this.commentRepository.findAllCommentsByBlogId(
            data.blogId, 
            data.pagination.page, 
            data.pagination.perPage, 
            this.transactionHandler);

                
        if (!comments.isSuccess)  return Result.fail(comments.Error, comments.StatusCode, comments.Message);
        let commentsRes: BlogComment[] = [];
        for (const comment of comments.Value) {
            commentsRes.push({id: comment.Id, user: comment.UserId, body: comment.Body, countLikes: comment.CountLikes, countDislikes: comment.CountDislikes, userLiked: comment.UserLiked, userDisliked: comment.UserDisliked, date: comment.DDate})
        };

        const response = new GetBlogCommentServiceResponseDto(commentsRes)
        return Result.success<GetBlogCommentServiceResponseDto>(response, comments.StatusCode);
    }
}