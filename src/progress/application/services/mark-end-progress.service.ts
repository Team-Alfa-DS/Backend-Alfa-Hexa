import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Progress } from "src/progress/domain/progress";
import { IService } from "src/common/application/interfaces/IService";
import { MarkEndProgressResponse } from "../dtos/response/mark-end-progress.response";
import { MarkEndProgressRequest } from "../dtos/request/mark-end-progress.request.dto";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { ProgressMarkAsCompleted } from "src/progress/domain/value-objects/progress-markAsCompleted";
import { ProgressTime } from "src/progress/domain/value-objects/progress-time";
import { ProgressLastTime } from "src/progress/domain/value-objects/progress-lastTime";
import { ProgressId } from "src/progress/domain/value-objects/progress-Id";
import { UserId } from "src/user/domain/value-objects/user-id";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { LessonId } from "src/course/domain/value-objects/lesson-id";

export class MarkEndProgressService extends IService<MarkEndProgressRequest, MarkEndProgressResponse> {

    private readonly progressRepository: IProgressRepository;
    private readonly courseRepository: ICourseRepository;
    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(progressRepository: IProgressRepository, 
        courseRepository: ICourseRepository, 
        userRepository: IUserRepository, 
        transactionHandler: ITransactionHandler)
        { 
        super();
        this.progressRepository = progressRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }

    async execute(value: MarkEndProgressRequest): Promise<Result<MarkEndProgressResponse>> {
        const course = await this.courseRepository.getCourseById(value.courseId); //TODO: el retorno deberia de ser un Result
        const user = await this.userRepository.findUserById(UserId.create(value.userId), this.transactionHandler)

        if (!course.isSuccess) return Result.fail(course.Error);
        if (!user.isSuccess) return Result.fail(user.Error);

        const lesson = course.Value.Lessons.find(lesson => lesson.id.equals(new LessonId(value.lessonId)) ) 
        if (!lesson) return Result.fail(new Error('No existe la leccion'));

        await this.progressRepository.saveProgress(
            Progress.create(
                ProgressId.create(value.userId, value.lessonId),
                ProgressMarkAsCompleted.create(value.markAsCompleted),
                UserId.create(value.userId),
                new CourseId(value.courseId),
                value.time > value.totalTime ? ProgressTime.create(value.totalTime) : ProgressTime.create(value.time),
                ProgressLastTime.create(new Date())
            ),
            this.transactionHandler
        );

        const response = new MarkEndProgressResponse()

        return Result.success(response);
    }

    // get name(): string {
    //     return this.constructor.name;
    // }

}