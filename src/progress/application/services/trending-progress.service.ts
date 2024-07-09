import { TrendingProgressRequest } from "../dtos/request/trending-progress.request.dto";
import { TrendingProgressResponse } from "../dtos/response/trending-progress.response.dto";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";
import { IService } from "src/common/application/interfaces/IService";
import { UserId } from "src/user/domain/value-objects/user-id";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { IOdmProgressRepository } from "../repositories/odm-progress.repository";

export class TrendingProgressService extends IService<TrendingProgressRequest, TrendingProgressResponse> {

    private readonly userRepository: IOdmUserRepository;
    private readonly progressRepository: IOdmProgressRepository;
    private readonly courseRepository: ICourseRepository;
    private readonly calcPercentService: CalcPercentService;

    constructor(
        userRepository: IOdmUserRepository, 
        progressRepository: IOdmProgressRepository, 
        courseRepository: ICourseRepository
    ) {
        super();
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
        this.courseRepository = courseRepository;
        this.calcPercentService = new CalcPercentService();
    }

    async execute(value: TrendingProgressRequest): Promise<Result<TrendingProgressResponse>> {
        const user = await this.userRepository.findUserById(UserId.create(value.userId));
        if (!user.isSuccess) return Result.fail(user.Error);

        const progress = await this.progressRepository.findLastProgressByUser(UserId.create(value.userId));
        if (!progress.isSuccess) return Result.fail(progress.Error);
        
        const course = await this.courseRepository.getCourseByLessonId(new LessonId(progress.Value.Id.LessonId));
        // if (!course.isSuccess) return Result.fail(course.Error); //FIXME: Necesita un try-catch

        const totalProgress = await this.progressRepository.findProgressByUserCourse(UserId.create(value.userId), course.Lessons);
        if (!totalProgress.isSuccess) return Result.fail(totalProgress.Error);

        const result = this.calcPercentService.execute(course.Lessons, totalProgress.Value);

        const response = new TrendingProgressResponse(result.percent, course.Title.value, course.Id.Value, progress.Value.LastTime?.LastTime);
        return Result.success(response);
    }
}