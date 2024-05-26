import { IApplicationService } from "src/common/application-service.interface/aplication-service.interface";
import { AddCommentToServiceDto } from "../../dto/blog/add-comment-to-service.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { Comment } from "src/comment/domain/Comment";


export class RegisterBlogCommentServices implements IApplicationService<AddCommentToServiceDto,Comment>{
    
    private readonly commentRepository: ICommentRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly idGenerator: IIdGen
    //private readonly encryptor: IEncryptor;

    constructor(
        commentRepository: ICommentRepository,
        transactionHandler: ITransactionHandler,
        idGenerator: IIdGen,
        //encryptor: IEncryptor
    ){
        this.commentRepository = commentRepository;
        this.transactionHandler = transactionHandler;
        this.idGenerator = idGenerator;
        //this.encryptor = encryptor;
    }
    
    async execute( data: AddCommentToServiceDto ): Promise<Result<Comment>> {
        const commentID = await this.idGenerator.genId();

        const comment: Comment = Comment.create(
        commentID,
        new Date(),
        data.body,
        data.userId,
        data.targetId,
        null,
        null,
        null,
        null,
        null,)

        const result = await this.commentRepository.saveComment( comment, this.transactionHandler )
        
        if ( !result.isSuccess ) return Result.fail<Comment>( result.Error, result.StatusCode,result.Message  );
        


        return Result.success<Comment>( comment, 200 )
    }
    
}