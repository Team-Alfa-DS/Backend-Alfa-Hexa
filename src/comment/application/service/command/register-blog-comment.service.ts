import { AddCommentToServiceRequestDto, AddCommentToServiceResponseDto } from "../../dto/blog/add-comment-to-service.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { IService } from "src/common/application/interfaces/IService";
import { UserId } from "src/user/domain/value-objects/user-id";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogPublicationDate } from "src/comment/domain/valueObjects/blog/comment-blog-publicationDate";
import { CommentBlogBody } from "src/comment/domain/valueObjects/blog/comment-blog-body";
import { CommentBlogUserId } from "src/comment/domain/valueObjects/blog/comment-blog-userId";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";


export class RegisterBlogCommentServices extends IService<AddCommentToServiceRequestDto,AddCommentToServiceResponseDto>{
    
    private readonly odmBlogRepository: IBlogRepository;
    private readonly userRepository: IUserRepository;
    private readonly blogRepository: IBlogRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly idGenerator: IIdGen;
    private readonly eventPublisher: IEventPublisher;

    constructor(
        odmBlogRepository: IBlogRepository,
        userRepository: IUserRepository,
        blogRepository: IBlogRepository,
        transactionHandler: ITransactionHandler,
        idGenerator: IIdGen,
        eventPublisher: IEventPublisher
    ){
        super()
        this.odmBlogRepository = odmBlogRepository;
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
        this.transactionHandler = transactionHandler;
        this.idGenerator = idGenerator;
        this.eventPublisher = eventPublisher;
    }
    
    async execute( data: AddCommentToServiceRequestDto ): Promise<Result<AddCommentToServiceResponseDto>> {
        try{
        let commentID = BlogCommentId.create(await this.idGenerator.genId());

        let user = await this.userRepository.findUserById( UserId.create(data.userId), this.transactionHandler );

        let blog = await this.odmBlogRepository.getBlogById( data.targetId );

        let publicationDate = CommentBlogPublicationDate.create( new Date() );
        let body = CommentBlogBody.create( data.body );
        let userId = CommentBlogUserId.create( data.userId );
        let target = BlogCommentBlogId.create( BlogId.create(data.targetId) );
        
        let comment = blog.Value.createComment(
            commentID,
            publicationDate,
            body,
            userId,
            target,
            null,
            null,
        );
        // console.log(comment);
        
        let comments = blog.Value.getComments();

        comments.push(commentID);

        await this.blogRepository.saveComment( comment );

        // await this.blogRepository.saveBlog( blog.Value );

        blog.Value.PostComment(
            commentID,
            publicationDate,
            body,
            userId,
            target,
        );
        
        this.eventPublisher.publish(blog.Value.pullDomainEvents());
        
        const response = new AddCommentToServiceResponseDto(commentID.commentId);

        return Result.success<AddCommentToServiceResponseDto>( response );
        }catch(err){
            return Result.fail<AddCommentToServiceResponseDto>(err);
        }
    }
    
}