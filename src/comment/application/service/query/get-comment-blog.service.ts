import { IApplicationService } from "src/common/application-service.interface/aplication-service.interface";
import { Result } from "src/common/domain/result-handler/result";
import { GetBlogCommentsServiceDto } from "../../dto/blog/blog-comment.response.dto";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export class GetCommentBlogService implements IApplicationService<GetBlogCommentsServiceDto,any>{
    
    private readonly commentRepository: ICommentRepository;
    private readonly transactionHandler: ITransactionHandler;
    static execute: any;
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
    
    execute(data : GetBlogCommentsServiceDto): Promise<Result<any>> {
        
        return 
    }

}