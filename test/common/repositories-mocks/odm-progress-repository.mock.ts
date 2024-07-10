import { Result } from "src/common/domain/result-handler/result";
import { Lesson } from "src/course/domain/entities/Lesson";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { IOdmProgressRepository } from "src/progress/application/repositories/odm-progress.repository";
import { Progress } from "src/progress/domain/progress";
import { CalcPercentService } from "src/progress/domain/services/calc-percent.service";
import { ProgressId } from "src/progress/domain/value-objects/progress-Id";
import { ProgressLastTime } from "src/progress/domain/value-objects/progress-lastTime";
import { ProgressMarkAsCompleted } from "src/progress/domain/value-objects/progress-markAsCompleted";
import { ProgressTime } from "src/progress/domain/value-objects/progress-time";
import { OdmProgressEntity } from "src/progress/infraestructure/entities/odm-entities/odm-progress.entity";
import { UserRole } from "src/user/domain/enums/role-user.type";
import { UserId } from "src/user/domain/value-objects/user-id";

export class OdmProgressRepositoryMock implements IOdmProgressRepository {

    private readonly progressOdm: OdmProgressEntity[] = [
        {
            lastTime: new Date(),
            markAsCompleted: false,
            time: 10,
            user: {
                id: '244fbecc-2127-433d-ba76-762fb2fee1c8',
                email: 'abcd@gmail.com',
                name: 'Daniel Bortot',
                password: '12345',
                phone: '12345678910',
                type: UserRole.CLIENT,
                image: null,
                trainers: []
            },
            lesson: {
                id: '62d3f486-3563-4525-acc4-4c0b22998c65',
                content: 'Contenido',
                seconds: 300,
                title: 'leccion 1',
                video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/lfc9awszmicb9k02uzkd.mp4'
            }
        }
    ];

    private readonly courseOdmId = '4a370052-3c3d-4a18-9ba1-a9fd5336a145'

    saveProgress(progress: Progress): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findProgressByUserCourse(userId: UserId, lessons: Lesson[]): Promise<Result<Progress[]>> {
        const progress = this.progressOdm.find(pro => pro.user.id === userId.Id);
        const progressDomain = Progress.create(
            ProgressId.create(progress.user.id, progress.lesson.id),
            ProgressMarkAsCompleted.create(progress.markAsCompleted),
            UserId.create(progress.user.id),
            new CourseId(this.courseOdmId),
            ProgressTime.create(progress.time),
            ProgressLastTime.create(progress.lastTime)
        );
        
        return Result.success([progressDomain]);
    }

    findLastProgressByUser(userId: UserId): Promise<Result<Progress>> {
        throw new Error("Method not implemented.");
    }

    async findProgressByUser(userId: UserId): Promise<Result<Progress[]>> {
        const progress = this.progressOdm.filter(pro => pro.user.id === userId.Id);

        const progressList: Progress[] = []
        for (const pro of progress) {
            progressList.push(
                Progress.create(
                    ProgressId.create(pro.user.id, pro.lesson.id),
                    ProgressMarkAsCompleted.create(pro.markAsCompleted),
                    UserId.create(pro.user.id),
                    new CourseId(this.courseOdmId),
                    ProgressTime.create(pro.time),
                    ProgressLastTime.create(pro.lastTime)
                )
            )
        }
        return Result.success(progressList);
    }

}