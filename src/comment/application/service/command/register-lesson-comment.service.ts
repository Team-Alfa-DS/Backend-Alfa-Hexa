import { AddCommentToServiceRequestDto, AddCommentToServiceResponseDto } from "../../dto/blog/add-comment-to-service.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { Comment } from "src/comment/domain/Comment";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { IService } from "src/common/application/interfaces/IService";
import { CommentBody } from "src/comment/domain/valueObjects/comment-body";
import { CommentLessonId } from "src/comment/domain/valueObjects/comment-lessonId";
import { CommentPublicationDate } from "src/comment/domain/valueObjects/comment-publicationDate";
import { CommentUserId } from "src/comment/domain/valueObjects/comment-userId";
import { CommentId } from "src/comment/domain/valueObjects/comment-id";


export class RegisterLessonCommentServices extends IService<AddCommentToServiceRequestDto,AddCommentToServiceResponseDto>{
    
    private readonly commentRepository: ICommentRepository;
    private readonly userRepository: IUserRepository;
    private readonly courseRepository: ICourseRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly idGenerator: IIdGen
    //private readonly encryptor: IEncryptor;

    constructor(
        commentRepository: ICommentRepository,
        userRepository: IUserRepository,
        courseRepository: ICourseRepository,
        transactionHandler: ITransactionHandler,
        idGenerator: IIdGen,
        //encryptor: IEncryptor
    ){
        super();
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.transactionHandler = transactionHandler;
        this.idGenerator = idGenerator;
        //this.encryptor = encryptor;
    }
    
    async execute( data: AddCommentToServiceRequestDto ): Promise<Result<AddCommentToServiceResponseDto>> {
        const commentID = CommentId.create(await this.idGenerator.genId());

        let user = await this.userRepository.findUserById( data.userId, this.transactionHandler );

        if ( !user.isSuccess ) return Result.fail( user.Error, user.StatusCode,user.Message  );

        let course = await this.courseRepository.getCourseByLessonId( data.targetId );

        if ( !course.isSuccess ) return Result.fail( course.Error, course.StatusCode,course.Message  );

        let publicationDate = CommentPublicationDate.create( new Date() );
        let body = CommentBody.create( data.body );
        let userId = CommentUserId.create( data.userId );
        let target = CommentLessonId.create( data.targetId );

        const comment: Comment = Comment.create(
            commentID,
            publicationDate,
            body,
            userId,
            null,
            target,
            null,
            null,
            null,
            null,
        );

        const result = await this.commentRepository.saveComment( comment, this.transactionHandler )
        
        if ( !result.isSuccess ) return Result.fail( result.Error, result.StatusCode,result.Message  );
        
        const response = new AddCommentToServiceResponseDto();

        return Result.success<AddCommentToServiceResponseDto>( response, 200 )
    }

}