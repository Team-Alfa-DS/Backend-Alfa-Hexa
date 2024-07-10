import { IMapper } from "src/common/application/mappers/mapper.interface";
import { Progress } from "src/progress/domain/progress";
import { OdmProgressEntity } from "../entities/odm-entities/odm-progress.entity";
import { ProgressId } from "src/progress/domain/value-objects/progress-Id";
import { ProgressMarkAsCompleted } from "src/progress/domain/value-objects/progress-markAsCompleted";
import { UserId } from "src/user/domain/value-objects/user-id";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { Model } from "mongoose";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { ProgressTime } from "src/progress/domain/value-objects/progress-time";
import { ProgressLastTime } from "src/progress/domain/value-objects/progress-lastTime";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { OdmLessonEntity } from "src/course/infraestructure/entities/odm-entities/odm-lesson.entity";

export class OdmProgressMapper implements IMapper<Progress, OdmProgressEntity> {
    private readonly courseModel: Model<OdmCourseEntity>;
    private readonly userModel: Model<OdmUserEntity>;
    private readonly lessonModel: Model<OdmLessonEntity>;

    constructor (courseModel: Model<OdmCourseEntity>, userModel: Model<OdmUserEntity>, lessonModel: Model<OdmLessonEntity>) {
        this.courseModel = courseModel;
        this.userModel = userModel;
        this.lessonModel = lessonModel;
    }

    async toPersistence(DomainEntity: Progress): Promise<OdmProgressEntity> {
        const user = await this.userModel.findOne({id: DomainEntity.User.Id});
        const lesson = await this.lessonModel.findOne({id: DomainEntity.Id.LessonId});
        const progressPersistence = OdmProgressEntity.create(
            user,
            lesson,
            DomainEntity.MarkAsCompleted.MarkAsCompleted,
            DomainEntity.Time.Time,
            DomainEntity.LastTime.LastTime
        );
        return progressPersistence;
    }

    async toDomain(odmEntity: OdmProgressEntity): Promise<Progress> {
        const course = await this.courseModel.aggregate<OdmCourseEntity>([
            {
                $unwind: '$lessons'
            },
            {
                $match: {
                    'lessons.id': odmEntity.lesson.id
                }
            }
        ]);
        const progressDomain = Progress.create(
            ProgressId.create(odmEntity.user.id, odmEntity.lesson.id),
            ProgressMarkAsCompleted.create(odmEntity.markAsCompleted),
            UserId.create(odmEntity.user.id),
            new CourseId(course[0].id),
            ProgressTime.create(odmEntity.time),
            ProgressLastTime.create(odmEntity.lastTime)
        )
        return progressDomain;
    }

}