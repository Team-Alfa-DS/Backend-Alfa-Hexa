import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { MarkEndProgressDto } from "../dtos/mark-end-progress.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Progress } from "src/progress/domain/progress";

export class MarkEndProgressService implements IApplicationService<MarkEndProgressDto, undefined> {

    private readonly progressRepository: IProgressRepository;
    private readonly courseRepository: ICourseRepository;
    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;

    constructor(progressRepository: IProgressRepository, 
        courseRepository: ICourseRepository, 
        userRepository: IUserRepository, 
        transactionHandler: ITransactionHandler)
        { 
        this.progressRepository = progressRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
    }

    async execute(value: MarkEndProgressDto): Promise<Result<undefined>> {
        const course = await this.courseRepository.getCourseById(value.courseId); //TODO: el retorno deberia de ser un Result
        const user = await this.userRepository.findUserById(value.userId, this.transactionHandler)

        if (!course) return Result.fail(new Error('No se encontro el curso'), 404, 'No se encontro el curso');
        if (!user.isSuccess) return Result.fail(user.Error, user.StatusCode, user.Message);
        if (course.lessons.findIndex(lesson => lesson.id == value.lessonId) == -1) return Result.fail(new Error('No existe la leccion'), 404, 'No existe la leccion')

        await this.progressRepository.saveProgress(
            Progress.create(
                value.userId, 
                value.lessonId, 
                value.markAsCompleted, 
                value.time
            ),
            this.transactionHandler
        );

        return Result.success(undefined, 200);
    }

    get name(): string {
        return this.constructor.name;
    }

}