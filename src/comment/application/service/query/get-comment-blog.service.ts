import { Result } from "src/common/domain/result-handler/result";
import { BlogComment, GetBlogCommentServiceResponseDto, GetBlogCommentsServiceRequestDto } from "../../dto/blog/blog-comment.response.dto";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IService } from "src/common/application/interfaces/IService";
import { IBlogCommentRepository } from "src/comment/domain/repositories/blog/comment-blog-repository.interface";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { BlogId } from "src/blog/domain/valueObjects/blogId";

export class GetCommentBlogService extends IService<GetBlogCommentsServiceRequestDto, GetBlogCommentServiceResponseDto>{
    
    private readonly commentBlogRepository: IBlogCommentRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(
        commentBlogRepository: IBlogCommentRepository,
        transactionHandler: ITransactionHandler,
    ){
        super();
        this.commentBlogRepository = commentBlogRepository;
        this.transactionHandler = transactionHandler;
    }
    
    async execute(data : GetBlogCommentsServiceRequestDto): Promise<Result<GetBlogCommentServiceResponseDto>> {
        const blogId = BlogCommentBlogId.create( BlogId.create(data.blogId) );

        const comments = await this.commentBlogRepository.findAllCommentsByBlogId(
            blogId, 
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

        if (data.pagination.perPage) {
            let page = data.pagination.page;
            if (!page) {page = 0}

            commentsRes = commentsRes.slice((page*data.pagination.perPage), (data.pagination.perPage) + (page*data.pagination.perPage));
        }

        const response = new GetBlogCommentServiceResponseDto(commentsRes)
        return Result.success<GetBlogCommentServiceResponseDto>(response, comments.StatusCode);
    }
}