import { AddCommentToServiceRequestDto, AddCommentToServiceResponseDto } from "../../dto/blog/add-comment-to-service.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { IService } from "src/common/application/interfaces/IService";
import { UserId } from "src/user/domain/value-objects/user-id";
import { ILessonCommentRepository } from "src/comment/domain/repositories/lesson/comment-lesson-repository.interface";
import { CommentLessonPublicationDate } from "src/comment/domain/valueObjects/lesson/comment-lesson-publicationDate";
import { CommentLessonBody } from "src/comment/domain/valueObjects/lesson/comment-lesson-body";
import { CommentLessonUserId } from "src/comment/domain/valueObjects/lesson/comment-lesson-userId";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { LessonCommentId } from "src/comment/domain/valueObjects/lesson/comment-lesson-id";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { error } from 'console';
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { ICourseCommandRepository } from "src/course/domain/repositories/ICourseCommand.repository";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";


export class RegisterLessonCommentServices extends IService<AddCommentToServiceRequestDto,AddCommentToServiceResponseDto>{

    private readonly userRepository: IUserRepository;
    private readonly courseCommandRepository: ICourseCommandRepository;
    private readonly courseQueryRepository: ICourseQueryRepository;
    private readonly transactionHandler: ITransactionHandler;
    private eventPublisher: IEventPublisher;
    private readonly idGenerator: IIdGen

    constructor(
        userRepository: IUserRepository,
        courseCommandRepository: ICourseCommandRepository,
        courseQueryRepository: ICourseQueryRepository,
        transactionHandler: ITransactionHandler,
        eventPublisher: IEventPublisher,
        idGenerator: IIdGen,
    ){
        super();
        this.userRepository = userRepository;
        this.courseCommandRepository = courseCommandRepository;
        this.transactionHandler = transactionHandler;
        this.eventPublisher = eventPublisher;
        this.idGenerator = idGenerator;
    }
    
    async execute( data: AddCommentToServiceRequestDto ): Promise<Result<AddCommentToServiceResponseDto>> {
        try{
            const commentID = LessonCommentId.create(await this.idGenerator.genId());

            let user = await this.userRepository.findUserById( UserId.create(data.userId), this.transactionHandler );
            if (!user.isSuccess) {return Result.fail(user.Error)}
            let course = await this.courseQueryRepository.getCourseByLessonId( new LessonId(data.targetId) );

            let publicationDate = CommentLessonPublicationDate.create( new Date() );
            let body = CommentLessonBody.create( data.body );
            let userId = CommentLessonUserId.create( data.userId );
            let target = LessonCommentLessonId.create(LessonId.create(data.targetId));

            course.createComment(
                commentID,
                publicationDate,
                body,
                userId,
                target,
                // null,
                // null
            );

            const comment = course.getComment(target.LessonId, commentID);

            const result = await this.courseCommandRepository.saveComment( comment );
            
            const response = new AddCommentToServiceResponseDto(commentID.commentId);
            
            this.eventPublisher.publish(course.pullDomainEvents());
            
            return Result.success<AddCommentToServiceResponseDto>( response );
        }catch(error){
            return Result.fail<AddCommentToServiceResponseDto>(error);
        }
    }

}