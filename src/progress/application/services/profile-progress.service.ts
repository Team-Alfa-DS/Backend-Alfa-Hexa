import { IService } from "src/common/application/interfaces/IService";
import { ProfileProgressRequest } from "../dtos/request/profile-progress.request";
import { ProfileProgressResponse } from "../dtos/response/profile-progress.response";
import { Result } from "src/common/domain/result-handler/result";
import { IProgressRepository } from "src/progress/domain/repositories/progress-repository.interface";
import { IUserRepository } from "src/user/domain/repositories/user-repository.interface";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";
import { Course } from "src/course/domain/Course";
import { Progress } from "src/progress/domain/progress";
import { CourseProgress } from "../dtos/response/courses-progress.response";
import { CalcPercentProgressResponse } from "src/progress/domain/response/calc-percent-progress.response";
import { CalcTotalCoursesPercentService } from "src/progress/domain/services/calc-total-courses-percent";
import { UserId } from "src/user/domain/value-objects/user-id";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { IOdmUserRepository } from "src/user/application/repositories/odm-user-repository.interface";
import { IOdmProgressRepository } from "../repositories/odm-progress.repository";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";

export class ProfileProgressService extends IService<ProfileProgressRequest, ProfileProgressResponse> {

    private readonly progressRepository: IOdmProgressRepository;
    private readonly courseRepository: ICourseQueryRepository;
    private readonly userRepository: IOdmUserRepository;
    private readonly calcPercent: CalcPercentService;
    private readonly calcTotalCoursesPercent: CalcTotalCoursesPercentService;

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
        this.calcTotalCoursesPercent = new CalcTotalCoursesPercentService();
    }

    async execute(value: ProfileProgressRequest): Promise<Result<ProfileProgressResponse>> {
        try {
            const user = await this.userRepository.findUserById(UserId.create(value.userId));

            if (!user.isSuccess) return Result.fail(user.Error);

            const progressUser = await this.progressRepository.findProgressByUser(UserId.create(value.userId));

            if (!progressUser.isSuccess) return Result.fail(progressUser.Error);

            let courses: Course[] = [];
            for (const pro of progressUser.Value) {
                const course = await this.courseRepository.getCourseByLessonId(new LessonId(pro.Id.LessonId));
                if (courses.findIndex(c => c.Id.equals(course.Id) /*c.id == course.Value.id*/) == -1) courses.push(course);
            }

            let progressUserList: Progress[][] = [];
            for (const course of courses) {
                const progress = await this.progressRepository.findProgressByUserCourse(UserId.create(value.userId), course.Lessons);
                progressUserList.push(progress.Value);
            }

            let progressCourseUser: CalcPercentProgressResponse[] = [];
            for (let i=0; i < progressUserList.length; i++) {
                const calc = this.calcPercent.execute(courses[i].Lessons, progressUserList[i]);
                progressCourseUser.push(calc);
            }
            const totalCoursesPercent = this.calcTotalCoursesPercent.execute(progressCourseUser);
            
            const response = new ProfileProgressResponse(totalCoursesPercent.percent, totalCoursesPercent.time);
            return Result.success(response);
        } catch (error) {
            return Result.fail(error);
        }
    }

}