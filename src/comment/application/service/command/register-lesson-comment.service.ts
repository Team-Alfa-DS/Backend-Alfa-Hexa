import { AddCommentToServiceRequestDto, AddCommentToServiceResponseDto } from "../../dto/blog/add-comment-to-service.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ICommentRepository } from "src/comment/domain/repositories/comment-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { Comment } from "src/comment/domain/Comment";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { IService } from "src/common/application/interfaces/IService";


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
        const commentID = await this.idGenerator.genId();

        let user = await this.userRepository.findUserById( data.userId, this.transactionHandler );

        if ( !user.isSuccess ) return Result.fail( user.Error, user.StatusCode,user.Message  );

        let course = await this.courseRepository.getCourseByLessonId( data.targetId );

        if ( !course.isSuccess ) return Result.fail( course.Error, course.StatusCode,course.Message  );

        const comment: Comment = Comment.create(
        commentID,
        new Date(),
        data.body,
        data.userId,
        null,
        data.targetId,
        null,
        null,
        null,
        null,)

        const result = await this.commentRepository.saveComment( comment, this.transactionHandler )
        
        if ( !result.isSuccess ) return Result.fail( result.Error, result.StatusCode,result.Message  );
        
        const response = new AddCommentToServiceResponseDto(comment.Id, comment.UserId, comment.Body, comment.CountLikes, comment.CountDislikes, comment.UserLiked, comment.UserDisliked, comment.DDate)

        return Result.success<AddCommentToServiceResponseDto>( response, 200 )
    }

}