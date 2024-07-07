import { IService } from "src/common/application/interfaces/IService";
import { CoursesProgressRequest } from "../dtos/request/courses-progress.request";
import { CourseProgress, CoursesProgressResponse } from "../dtos/response/courses-progress.response";
import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Course } from "src/course/domain/Course";
import { Progress } from "src/progress/domain/progress";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";
import { UserId } from "src/user/domain/value-objects/user-id";
import { LessonId } from "src/course/domain/value-objects/lesson-id";

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
        const user = await this.userRepository.findUserById(UserId.create(value.userId), this.transactionHandler);

        if (!user.isSuccess) return Result.fail(user.Error);

        const progressUser = await this.progressRepository.findProgressByUser(UserId.create(value.userId), this.transactionHandler);

        if (!progressUser.isSuccess) return Result.fail(progressUser.Error);

        let courses: Course[] = [];
        for (const pro of progressUser.Value) {
            const course = await this.courseRepository.getCourseByLessonId(new LessonId(pro.Id.LessonId));
            if (courses.findIndex(c => c.Id.equals(course.Id) ) == -1) courses.push(course);
        }

        if (value.perpage) {
            let page = 0;
            if (value.page) {page = value.page}

            courses = courses.slice((page*value.perpage), value.perpage + (page*value.perpage));
        }

        let progressUserList: Progress[][] = [];
        for (const course of courses) {
            const progress = await this.progressRepository.findProgressByUserCourse(UserId.create(value.userId), course.Lessons, this.transactionHandler);
            progressUserList.push(progress.Value);
        }

        let progressCourseUser: CourseProgress[] = [];
        for (let i=0; i < progressUserList.length; i++) {
            const calc = this.calcPercent.execute(courses[i].Lessons, progressUserList[i]);
            progressCourseUser.push({
                id: courses[i].Id.Value,
                title: courses[i].Title.value,
                image: courses[i].Image.Value,
                date: courses[i].Date,
                category: courses[i].Category.value.value,
                trainer: courses[i].Trainer.value.trainerId, //FIXME: !Trainer en curso es un Id de trainer
                percent: calc.percent
            })
        }

        const response = new CoursesProgressResponse(progressCourseUser);
        return Result.success(response);
    }

}