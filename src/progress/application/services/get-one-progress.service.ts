import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";
import { IService } from "src/common/application/interfaces/IService";
import { GetOneProgressResponse } from "../dtos/response/get-one-progress.response";
import { GetOneProgressRequest } from "../dtos/request/get-one-progress.request.dto";

export class GetOneProgressService extends IService<GetOneProgressRequest, GetOneProgressResponse> {

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

    async execute(value: GetOneProgressRequest): Promise<Result<GetOneProgressResponse>> {
        const user = await this.userRepository.findUserById(value.userId, this.transactionHandler);
        const course = await this.courseRepository.getCourseById(value.courseId); //TODO: el retorno deberia de ser un Result

        if (!user.isSuccess) return Result.fail(user.Error, user.StatusCode, user.Message);
        if (!course.isSuccess) return Result.fail(course.Error, course.StatusCode, course.Message);

        const progress = await this.progressRepository.findProgressByUserCourse(value.userId, course.Value.lessons, this.transactionHandler);
        if (!progress.isSuccess) return Result.fail(progress.Error, progress.StatusCode, progress.Message);

        const calc = this.calcPercentService.execute(course.Value.lessons, progress.Value);
        const response = new GetOneProgressResponse(calc.percent, calc.lessons);

        return Result.success(response, 200);
    }

    // get name(): string {
    //     return this.constructor.name;
    // }

}