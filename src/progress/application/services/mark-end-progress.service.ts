import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Progress } from "src/progress/domain/progress";
import { IService } from "src/common/application/interfaces/IService";
import { MarkEndProgressResponse } from "../dtos/response/mark-end-progress.response";
import { MarkEndProgressRequest } from "../dtos/request/mark-end-progress.request.dto";
import { ProgressMarkAsCompleted } from "src/progress/domain/value-objects/progress-markAsCompleted";
import { ProgressTime } from "src/progress/domain/value-objects/progress-time";
import { ProgressLastTime } from "src/progress/domain/value-objects/progress-lastTime";
import { ProgressUserId } from "src/progress/domain/value-objects/progress-userId";
import { ProgressLessonId } from "src/progress/domain/value-objects/progress-lessonId";

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
        const user = await this.userRepository.findUserById(value.userId, this.transactionHandler)

        if (!course.isSuccess) return Result.fail(course.Error, course.StatusCode, course.Message);
        if (!user.isSuccess) return Result.fail(user.Error, user.StatusCode, user.Message);

        const lesson = course.Value.lessons.find(lesson => lesson.id == value.lessonId) 
        if (!lesson) return Result.fail(new Error('No existe la leccion'), 404, 'No existe la leccion');

        await this.progressRepository.saveProgress(
            Progress.create(
                ProgressUserId.create(value.userId),
                ProgressLessonId.create(value.lessonId),
                ProgressMarkAsCompleted.create(value.markAsCompleted), 
                value.time > lesson.seconds ? ProgressTime.create(lesson.seconds) : ProgressTime.create(value.time),
                ProgressLastTime.create(new Date())
            ),
            this.transactionHandler
        );

        const response = new MarkEndProgressResponse()

        return Result.success(response, 200);
    }

    // get name(): string {
    //     return this.constructor.name;
    // }

}