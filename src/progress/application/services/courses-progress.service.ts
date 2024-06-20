import { IService } from "src/common/application/interfaces/IService";
import { CoursesProgressRequest } from "../dtos/request/courses-progress.request";
import { CourseProgress, CoursesProgressResponse } from "../dtos/response/courses-progress.response";
import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Course } from "src/course/domain/Course";
import { Progress } from "src/progress/domain/progress";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";

export class CoursesProgressService extends IService<CoursesProgressRequest, CoursesProgressResponse> {

    private readonly progressRepository: IProgressRepository;
    private readonly courseRepository: ICourseRepository;
    private readonly userRepository: IUserRepository;
    private readonly transactionHandler: ITransactionHandler;
    private readonly calcPercent: CalcPercentService;

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
    }

    async execute(value: CoursesProgressRequest): Promise<Result<CoursesProgressResponse>> {
        const user = await this.userRepository.findUserById(value.userId, this.transactionHandler);

        if (!user.isSuccess) return Result.fail(user.Error, user.StatusCode, user.Message);

        const progressUser = await this.progressRepository.findProgressByUser(value.userId, this.transactionHandler);

        if (!progressUser.isSuccess) return Result.fail(progressUser.Error, progressUser.StatusCode, progressUser.Message);

        let courses: Course[] = [];
        for (const pro of progressUser.Value) {
            const course = await this.courseRepository.getCourseByLessonId(pro.LessonId.LessonId);
            if (courses.findIndex(c => c.id == course.Value.id) == -1) courses.push(course.Value);
        }

        courses = courses.slice(value.perpage | 0, value.page | courses.length);

        let progressUserList: Progress[][] = [];
        for (const course of courses) {
            const progress = await this.progressRepository.findProgressByUserCourse(value.userId, course.lessons, this.transactionHandler);
            progressUserList.push(progress.Value);
        }

        let progressCourseUser: CourseProgress[] = [];
        for (let i=0; i < progressUserList.length; i++) {
            const calc = this.calcPercent.execute(courses[i].lessons, progressUserList[i]);
            progressCourseUser.push({
                id: courses[i].id,
                title: courses[i].title,
                image: courses[i].image,
                date: courses[i].date,
                category: courses[i].category,
                trainer: courses[i].trainer.name,
                percent: calc.percent
            })
        }

        const response = new CoursesProgressResponse(progressCourseUser);
        return Result.success(response, 200);
    }

}