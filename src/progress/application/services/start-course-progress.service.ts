import { IService } from "src/common/application/interfaces/IService";
import { StartCourseProgressRequest } from "../dtos/request/start-course-progress.request";
import { StartCourseProgressResponse } from "../dtos/response/start-course-progress.response";
import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";
import { UserId } from "src/user/domain/value-objects/user-id";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { Progress } from "src/progress/domain/progress";
import { ProgressId } from "src/progress/domain/value-objects/progress-Id";
import { ProgressMarkAsCompleted } from "src/progress/domain/value-objects/progress-markAsCompleted";
import { ProgressTime } from "src/progress/domain/value-objects/progress-time";
import { ProgressLastTime } from "src/progress/domain/value-objects/progress-lastTime";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";

export class StartCourseProgressService extends IService<StartCourseProgressRequest, StartCourseProgressResponse> {

    private readonly progressRepository: IProgressRepository;
    private readonly odmUserRepository: IOdmUserRepository;
    private readonly courseRepository: ICourseRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly eventPublisher: IEventPublisher;

    constructor(progressRepository: IProgressRepository, odmUserRepository: IOdmUserRepository, courseRepository: ICourseRepository, transactionHandler: ITransactionHandler, eventPublisher: IEventPublisher) {
        super();
        this.progressRepository = progressRepository;
        this.odmUserRepository = odmUserRepository;
        this.courseRepository = courseRepository;
        this.transactionHandler = transactionHandler;
        this.eventPublisher = eventPublisher;
    }

    async execute(value: StartCourseProgressRequest): Promise<Result<StartCourseProgressResponse>> {
        const course = await this.courseRepository.getCourseById(new CourseId(value.courseId));
        const user = await this.odmUserRepository.findUserById(UserId.create(value.userId));
        if (!user.isSuccess) return Result.fail(user.Error);
        const lesson = course.Lessons[0];
        if (!lesson) return Result.fail(new Error('No existen lecciones para este curso'));

        const progressDomain = Progress.create(
            ProgressId.create(value.userId, lesson.id.Value),
            ProgressMarkAsCompleted.create(false),
            UserId.create(value.userId),
            new CourseId(value.courseId),
            ProgressTime.create(0),
            ProgressLastTime.create(new Date())
        )
        await this.progressRepository.saveProgress(progressDomain, this.transactionHandler);
        progressDomain.Register();
        this.eventPublisher.publish(progressDomain.pullDomainEvents());

        const response = new StartCourseProgressResponse()
        return Result.success(response);
    }

}