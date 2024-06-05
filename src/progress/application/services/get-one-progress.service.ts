import { IApplicationService } from "src/common/application/application-service/application-service.interface";
import { GetOneProgressDto } from "../dtos/request/get-one-progress.request.dto";
import { GetOneProgressResponse } from "../../domain/response/get-one-progress.response";
import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";

export class GetOneProgressService implements IApplicationService<GetOneProgressDto, GetOneProgressResponse> {

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

    async execute(value: GetOneProgressDto): Promise<Result<GetOneProgressResponse>> {
        const user = await this.userRepository.findUserById(value.userId, this.transactionHandler);
        const course = await this.courseRepository.getCourseById(value.courseId); //TODO: el retorno deberia de ser un Result

        if (!user.isSuccess) return Result.fail(user.Error, user.StatusCode, user.Message);
        if (!course) return Result.fail(new Error('No se encontro el curso'), 404, 'No se encontro el curso');

        const progress = await this.progressRepository.findProgressByUserCourse(value.userId, course.lessons, this.transactionHandler);
        if (!progress.isSuccess) return Result.fail(progress.Error, progress.StatusCode, progress.Message);

        const response = this.calcPercentService.execute(course.lessons, progress.Value);

        return Result.success(response, 200);
    }

    get name(): string {
        return this.constructor.name;
    }

}