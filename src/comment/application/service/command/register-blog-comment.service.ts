import { AddCommentToServiceRequestDto, AddCommentToServiceResponseDto } from "../../dto/blog/add-comment-to-service.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { IService } from "src/common/application/interfaces/IService";
import { UserId } from "src/user/domain/value-objects/user-id";
import { IBlogCommentRepository } from "src/comment/domain/repositories/blog/comment-blog-repository.interface";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogPublicationDate } from "src/comment/domain/valueObjects/blog/comment-blog-publicationDate";
import { CommentBlogBody } from "src/comment/domain/valueObjects/blog/comment-blog-body";
import { CommentBlogUserId } from "src/comment/domain/valueObjects/blog/comment-blog-userId";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlog } from "src/comment/domain/comment-blog";


export class RegisterBlogCommentServices extends IService<AddCommentToServiceRequestDto,AddCommentToServiceResponseDto>{
    
    private readonly commentBlogRepository: IBlogCommentRepository;
    private readonly userRepository: IUserRepository;
    private readonly blogRepository: IBlogRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly idGenerator: IIdGen

    constructor(
        commentBlogRepository: IBlogCommentRepository,
        userRepository: IUserRepository,
        blogRepository: IBlogRepository,
        transactionHandler: ITransactionHandler,
        idGenerator: IIdGen,
    ){
        super()
        this.commentBlogRepository = commentBlogRepository;
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
        this.transactionHandler = transactionHandler;
        this.idGenerator = idGenerator;
    }
    
    async execute( data: AddCommentToServiceRequestDto ): Promise<Result<AddCommentToServiceResponseDto>> {
        let commentID = BlogCommentId.create(await this.idGenerator.genId());

        let user = await this.userRepository.findUserById( UserId.create(data.userId), this.transactionHandler );

        if ( !user.isSuccess ) return Result.fail( user.Error );

        let blog = await this.blogRepository.getBlogById( data.targetId );

        if ( !blog.isSuccess ) return Result.fail( blog.Error );

        let publicationDate = CommentBlogPublicationDate.create( new Date() );
        let body = CommentBlogBody.create( data.body );
        let userId = CommentBlogUserId.create( data.userId );
        let target = BlogCommentBlogId.create( data.targetId );

        const comment: CommentBlog = CommentBlog.create(
        commentID,
        publicationDate,
        body,
        userId,
        target,
        null,
        null,
        null,
        null,)

        const result = await this.commentBlogRepository.saveComment( comment, this.transactionHandler )
        
        if ( !result.isSuccess ) return Result.fail( result.Error );
        
        const response = new AddCommentToServiceResponseDto();

        return Result.success<AddCommentToServiceResponseDto>( response );
    }
    
}