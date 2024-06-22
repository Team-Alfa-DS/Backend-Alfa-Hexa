import { AddCommentToServiceRequestDto, AddCommentToServiceResponseDto } from "../../dto/blog/add-comment-to-service.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { Comment } from "src/comment/domain/Comment";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { IService } from "src/common/application/interfaces/IService";
import { UserId } from "src/user/domain/value-objects/user-id";


export class RegisterBlogCommentServices extends IService<AddCommentToServiceRequestDto,AddCommentToServiceResponseDto>{
    
    private readonly commentRepository: ICommentRepository;
    private readonly userRepository: IUserRepository;
    private readonly blogRepository: IBlogRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly idGenerator: IIdGen

    constructor(
        commentRepository: ICommentRepository,
        userRepository: IUserRepository,
        blogRepository: IBlogRepository,
        transactionHandler: ITransactionHandler,
        idGenerator: IIdGen,
    ){
        super()
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
        this.transactionHandler = transactionHandler;
        this.idGenerator = idGenerator;
    }
    
    async execute( data: AddCommentToServiceRequestDto ): Promise<Result<AddCommentToServiceResponseDto>> {
        const commentID = await this.idGenerator.genId();

        let user = await this.userRepository.findUserById( UserId.create(data.userId), this.transactionHandler );

        if ( !user.isSuccess ) return Result.fail( user.Error, user.StatusCode,user.Message  );

        let blog = await this.blogRepository.getBlogById( data.targetId );

        if ( !blog.isSuccess ) return Result.fail( blog.Error, blog.StatusCode,blog.Message  );

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
        
        if ( !result.isSuccess ) return Result.fail( result.Error, result.StatusCode,result.Message  );
        
        const response = new AddCommentToServiceResponseDto();

        return Result.success<AddCommentToServiceResponseDto>( response, 200 );
    }
    
}