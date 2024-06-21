import { Result } from "src/common/domain/result-handler/result";
import { BlogComment, GetBlogCommentServiceResponseDto, GetBlogCommentsServiceRequestDto } from "../../dto/blog/blog-comment.response.dto";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IService } from "src/common/application/interfaces/IService";
import { CommentBlogId } from "src/comment/domain/valueObjects/comment-blogId";

export class GetCommentBlogService extends IService<GetBlogCommentsServiceRequestDto, GetBlogCommentServiceResponseDto>{
    
    private readonly commentRepository: ICommentRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(
        commentRepository: ICommentRepository,
        transactionHandler: ITransactionHandler,
    ){
        super();
        this.commentRepository = commentRepository;
        this.transactionHandler = transactionHandler;
    }
    
    async execute(data : GetBlogCommentsServiceRequestDto): Promise<Result<GetBlogCommentServiceResponseDto>> {
        if (!data.pagination.page) data.pagination.page = 0;
        
        const blogId = CommentBlogId.create( data.blogId );

        const comments = await this.commentRepository.findAllCommentsByBlogId(
            blogId, 
            data.pagination.page, 
            data.pagination.perPage, 
            this.transactionHandler
        );
                
        if (!comments.isSuccess)  return Result.fail(comments.Error, comments.StatusCode, comments.Message);
        let commentsRes: BlogComment[] = [];
        for (const comment of comments.Value) {
            commentsRes.push({
                id: comment.Id.commentId, 
                user: comment.UserId.UserId, 
                body: comment.Body.Body, 
                countLikes: comment.CountLikes.CountLike, 
                countDislikes: comment.CountDislikes.CountDislike, 
                userLiked: comment.UserLiked.UserLiked, 
                userDisliked: comment.UserDisliked.UserDisliked, 
                date: comment.PublicationDate.PublicationDate})
        };

        const response = new GetBlogCommentServiceResponseDto(commentsRes)
        return Result.success<GetBlogCommentServiceResponseDto>(response, comments.StatusCode);
    }
}