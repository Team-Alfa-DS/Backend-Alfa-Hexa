import { Result } from "src/common/domain/result-handler/result";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";
import { IService } from "src/common/application/interfaces/IService";
import { GetOneProgressResponse } from "../dtos/response/get-one-progress.response";
import { GetOneProgressRequest } from "../dtos/request/get-one-progress.request.dto";
import { UserId } from "src/user/domain/value-objects/user-id";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { IOdmProgressRepository } from "../repositories/odm-progress.repository";

export class GetOneProgressService extends IService<GetOneProgressRequest, GetOneProgressResponse> {

    private readonly userRepository: IOdmUserRepository;
    private readonly progressRepository: IOdmProgressRepository;
    private readonly courseRepository: ICourseRepository;
    private readonly calcPercentService: CalcPercentService;

    constructor(
        userRepository: IOdmUserRepository, 
        progressRepository: IOdmProgressRepository, 
        courseRepository: ICourseRepository, 
        transactionHandler: ITransactionHandler
    ) {
        super();
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
        this.courseRepository = courseRepository;
        this.calcPercentService = new CalcPercentService();
    }

    async execute(value: GetOneProgressRequest): Promise<Result<GetOneProgressResponse>> {
        const user = await this.userRepository.findUserById(UserId.create(value.userId));
        const course = await this.courseRepository.getCourseById(new CourseId(value.courseId)); //TODO: el retorno deberia de ser un Result

        if (!user.isSuccess) return Result.fail(user.Error);
        // if (!course.isSuccess) return Result.fail(course.Error); //FIXME: Necesita un try-catch

        const progress = await this.progressRepository.findProgressByUserCourse(UserId.create(value.userId), course.Lessons);
        if (!progress.isSuccess) return Result.fail(progress.Error);

        const calc = this.calcPercentService.execute(course.Lessons, progress.Value);
        const response = new GetOneProgressResponse(calc.percent, calc.lessons);

        return Result.success(response);
    }

    // get name(): string {
    //     return this.constructor.name;
    // }

}