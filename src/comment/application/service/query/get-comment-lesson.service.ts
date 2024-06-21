import { GetLessonCommentServiceResponseDto, GetLessonCommentsServiceRequestDto, LessonComment } from "../../dto/lesson/lesson-comment.response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IService } from "src/common/application/interfaces/IService";
import { CommentLessonId } from "src/comment/domain/valueObjects/comment-lessonId";

export class GetCommentLessonService extends IService<GetLessonCommentsServiceRequestDto, GetLessonCommentServiceResponseDto>{
    
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
    
    async execute(data: GetLessonCommentsServiceRequestDto): Promise<Result<GetLessonCommentServiceResponseDto>> {

        if (!data.pagination.page) data.pagination.page = 0;
          
        let lessonId = CommentLessonId.create( data.lessonId );

        const comments = await this.commentRepository.findAllCommentsByLessonId(
            lessonId, 
            data.pagination.page, 
            data.pagination.perPage, 
            this.transactionHandler
        );
        
        if (!comments.isSuccess)  return Result.fail(comments.Error, comments.StatusCode, comments.Message);

        let commentsRes: LessonComment[] = [];
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

        const response = new GetLessonCommentServiceResponseDto(commentsRes)
        return Result.success<GetLessonCommentServiceResponseDto>(response, comments.StatusCode);
    }

}