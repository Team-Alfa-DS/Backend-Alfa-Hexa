import { TrendingProgressRequest } from "../dtos/request/trending-progress.request.dto";
import { TrendingProgressResponse } from "../dtos/response/trending-progress.response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";
import { IService } from "src/common/application/interfaces/IService";
import { UserId } from "src/user/domain/value-objects/user-id";

export class TrendingProgressService extends IService<TrendingProgressRequest, TrendingProgressResponse> {

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
        super();
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
        this.courseRepository = courseRepository;
        this.transactionHandler = transactionHandler;
        this.calcPercentService = new CalcPercentService();
    }

    async execute(value: TrendingProgressRequest): Promise<Result<TrendingProgressResponse>> {
        const user = await this.userRepository.findUserById(UserId.create(value.userId), this.transactionHandler);
        if (!user.isSuccess) return Result.fail(user.Error);

        const progress = await this.progressRepository.findLastProgressByUser(UserId.create(value.userId), this.transactionHandler);
        if (!progress.isSuccess) return Result.fail(progress.Error);
        
        const course = await this.courseRepository.getCourseByLessonId(progress.Value.Id.LessonId);
        // if (!course.isSuccess) return Result.fail(course.Error); //FIXME: Necesita un try-catch

        const totalProgress = await this.progressRepository.findProgressByUserCourse(UserId.create(value.userId), course.Lessons, this.transactionHandler);
        if (!totalProgress.isSuccess) return Result.fail(totalProgress.Error);

        const result = this.calcPercentService.execute(course.Lessons, totalProgress.Value);

        const response = new TrendingProgressResponse(result.percent, course.Title.value, course.Id.Value, progress.Value.LastTime?.LastTime);
        return Result.success(response);
    }
    // get name(): string {
    //     return this.constructor.name;
    // }

}