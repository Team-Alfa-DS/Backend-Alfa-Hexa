import { IService } from "src/common/application/interfaces/IService";
import { CoursesProgressRequest } from "../dtos/request/courses-progress.request";
import { CourseProgress, CoursesProgressResponse } from "../dtos/response/courses-progress.response";
import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Course } from "src/course/domain/Course";
import { Progress } from "src/progress/domain/progress";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";
import { UserId } from "src/user/domain/value-objects/user-id";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { IOdmProgressRepository } from "../repositories/odm-progress.repository";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";

export class CoursesProgressService extends IService<CoursesProgressRequest, CoursesProgressResponse> {

    private readonly progressRepository: IOdmProgressRepository;
    private readonly courseRepository: ICourseQueryRepository;
    private readonly userRepository: IOdmUserRepository;
    private readonly calcPercent: CalcPercentService;

    constructor(
        progressRepository: IOdmProgressRepository,
        courseRepository: ICourseQueryRepository,
        userRepository: IOdmUserRepository,
    ) {
        super();
        this.progressRepository = progressRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.calcPercent = new CalcPercentService();
    }

    async execute(value: CoursesProgressRequest): Promise<Result<CoursesProgressResponse>> {
        const user = await this.userRepository.findUserById(UserId.create(value.userId));

        if (!user.isSuccess) return Result.fail(user.Error);

        const progressUser = await this.progressRepository.findProgressByUser(UserId.create(value.userId));

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
            const progress = await this.progressRepository.findProgressByUserCourse(UserId.create(value.userId), course.Lessons);
            progressUserList.push(progress.Value);
        }

        let progressCourseUser: CourseProgress[] = [];
        for (let i=0; i < progressUserList.length; i++) {
            const calc = this.calcPercent.execute(courses[i].Lessons, progressUserList[i]);
            progressCourseUser.push({
                id: courses[i].Id.Value,
                title: courses[i].Title.value,
                image: courses[i].Image.Value,
                date: courses[i].Date.value,
                category: courses[i].Category.value.value,
                trainer: courses[i].Trainer.value.trainerId, //FIXME: !Trainer en curso es un Id de trainer
                percent: calc.percent
            })
        }

        const response = new CoursesProgressResponse(progressCourseUser);
        return Result.success(response);
    }

}