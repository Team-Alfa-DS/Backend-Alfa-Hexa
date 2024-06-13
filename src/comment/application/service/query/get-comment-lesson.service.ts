import { IApplicationService } from "src/common/application-service.interface/aplication-service.interface";
import { GetLessonCommentServiceResponseDto, GetLessonCommentsServiceRequestDto, LessonComment } from "../../dto/lesson/lesson-comment.response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Comment } from "src/comment/domain/Comment";
import { IService } from "src/common/application/interfaces/IService";

export class GetCommentLessonService extends IService<GetLessonCommentsServiceRequestDto, GetLessonCommentServiceResponseDto>{
    
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
    
    async execute(data: GetLessonCommentsServiceRequestDto): Promise<Result<GetLessonCommentServiceResponseDto>> {

        if (!data.pagination.page) data.pagination.page = 0;
                
        const comments = await this.commentRepository.findAllCommentsByLessonId(
            data.lessonId, 
            data.pagination.page, 
            data.pagination.perPage, 
            this.transactionHandler
        );
        
        if (!comments.isSuccess)  return Result.fail(comments.Error, comments.StatusCode, comments.Message);

        let commentsRes: LessonComment[] = [];
        for (const comment of comments.Value) {
            commentsRes.push({id: comment.Id, user: comment.UserId, body: comment.Body, countLikes: comment.CountLikes, countDislikes: comment.CountDislikes, userLiked: comment.UserLiked, userDisliked: comment.UserDisliked, date: comment.DDate})
        };

        const response = new GetLessonCommentServiceResponseDto(commentsRes)
        return Result.success<GetLessonCommentServiceResponseDto>(response, comments.StatusCode);
    }

}