import { IService } from "src/common/application/interfaces/IService";
import { ProfileProgressRequest } from "../dtos/request/profile-progress.request";
import { ProfileProgressResponse } from "../dtos/response/profile-progress.response";
import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";
import { Course } from "src/course/domain/Course";
import { Progress } from "src/progress/domain/progress";
import { CourseProgress } from "../dtos/response/courses-progress.response";
import { CalcPercentProgressResponse } from "src/progress/domain/response/calc-percent-progress.response";
import { CalcTotalCoursesPercentService } from "src/progress/domain/services/calc-total-courses-percent";

export class ProfileProgressService extends IService<ProfileProgressRequest, ProfileProgressResponse> {

    private readonly progressRepository: IProgressRepository;
    private readonly courseRepository: ICourseRepository;
    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly calcPercent: CalcPercentService;
    private readonly calcTotalCoursesPercent: CalcTotalCoursesPercentService;

    constructor(
        progressRepository: IProgressRepository,
        courseRepository: ICourseRepository,
        userRepository: IUserRepository,
        transactionHandler: ITransactionHandler
    ) {
        super();
        this.progressRepository = progressRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.transactionHandler = transactionHandler;
        this.calcPercent = new CalcPercentService();
        this.calcTotalCoursesPercent = new CalcTotalCoursesPercentService();
    }

    async execute(value: ProfileProgressRequest): Promise<Result<ProfileProgressResponse>> {
        const user = await this.userRepository.findUserById(value.userId, this.transactionHandler);

        if (!user.isSuccess) return Result.fail(user.Error, user.StatusCode, user.Message);

        const progressUser = await this.progressRepository.findProgressByUser(value.userId, this.transactionHandler);

        if (!progressUser.isSuccess) return Result.fail(progressUser.Error, progressUser.StatusCode, progressUser.Message);

        let courses: Course[] = [];
        for (const pro of progressUser.Value) {
            const course = await this.courseRepository.getCourseByLessonId(pro.LessonId);
            if (courses.findIndex(c => c.id == course.Value.id) == -1) courses.push(course.Value);
        }

        let progressUserList: Progress[][] = [];
        for (const course of courses) {
            const progress = await this.progressRepository.findProgressByUserCourse(value.userId, course.lessons, this.transactionHandler);
            progressUserList.push(progress.Value);
        }

        let progressCourseUser: CalcPercentProgressResponse[] = [];
        for (let i=0; i < progressUserList.length; i++) {
            const calc = this.calcPercent.execute(courses[i].lessons, progressUserList[i]);
            progressCourseUser.push(calc);
        }
        const totalCoursesPercent = this.calcTotalCoursesPercent.execute(progressCourseUser);
        
        const response = new ProfileProgressResponse(totalCoursesPercent.percent, totalCoursesPercent.time);
        return Result.success(response, 200);
    }

}