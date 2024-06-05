import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { TrendingProgressDto } from "../dtos/request/trending-progress.request.dto";
import { TrendingProgressResponse } from "../dtos/response/trending-progress.response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";

export class TrendingProgressService implements IApplicationService<TrendingProgressDto, TrendingProgressResponse> {

    private readonly userRepository: IUserRepository;
    private readonly progressRepository: IProgressRepository;
    private readonly courseRepository: ICourseRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly calcPercentService: CalcPercentService;

    constructor(
        userRepository: IUserRepository, 
        progressRepository: IProgressRepository, 
        courseRepository: ICourseRepository, 
        transactionHandler: ITransactionHandler
    ) {
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
        this.courseRepository = courseRepository;
        this.transactionHandler = transactionHandler;
        this.calcPercentService = new CalcPercentService();
    }

    async execute(value: TrendingProgressDto): Promise<Result<TrendingProgressResponse>> {
        const user = await this.userRepository.findUserById(value.userId, this.transactionHandler);
        if (!user.isSuccess) return Result.fail(user.Error, user.StatusCode, user.Message);

        const progress = await this.progressRepository.findLastProgressByUser(value.userId, this.transactionHandler);
        if (!progress.isSuccess) return Result.fail(progress.Error, progress.StatusCode, progress.Message);
        
        const course = await this.courseRepository.getCourseByLessonId(progress.Value.LessonId);
        if (!course.isSuccess) return Result.fail(course.Error, course.StatusCode, course.Message);

        const totalProgress = await this.progressRepository.findProgressByUserCourse(value.userId, course.Value.lessons, this.transactionHandler);
        if (!totalProgress.isSuccess) return Result.fail(totalProgress.Error, totalProgress.StatusCode, totalProgress.Message);

        const result = this.calcPercentService.execute(course.Value.lessons, totalProgress.Value);

        const response: TrendingProgressResponse = {
            percent: result.percent,
            courseTitle: course.Value.name,
            courseId: course.Value.id,
            lastTime: progress.Value.LastTime
        } 

        return Result.success(response, 200);
    }
    get name(): string {
        return this.constructor.name;
    }

}