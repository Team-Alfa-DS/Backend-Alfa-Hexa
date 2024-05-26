import { IApplicationService } from "src/common/application-service.interface/aplication-service.interface";
import { GetLessonCommentsServiceDto } from "../../dto/lesson/lesson-comment.response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Comment } from "src/comment/domain/Comment";

export class GetCommentLessonService implements IApplicationService<GetLessonCommentsServiceDto,any>{
    
    private readonly commentRepository: ICommentRepository;
    private readonly transactionHandler: ITransactionHandler;
    //private readonly encryptor: IEncryptor;

    constructor(
        commentRepository: ICommentRepository,
        transactionHandler: ITransactionHandler,
        //encryptor: IEncryptor
    ){
        this.commentRepository = commentRepository;
        this.transactionHandler = transactionHandler;
        //this.encryptor = encryptor;
    }
    
    execute(data : GetLessonCommentsServiceDto): Promise<Result<Comment[]>> {
        return this.commentRepository.findAllCommentsByBlogId(data.lessonId,this.transactionHandler);
    }

}