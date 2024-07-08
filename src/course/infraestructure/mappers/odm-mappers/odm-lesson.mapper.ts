import { Lesson } from "src/course/domain/entities/Lesson";
import { OdmLessonEntity } from "../../entities/odm-entities/odm-lesson.entity";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { LessonVideo } from "src/course/domain/value-objects/lesson-video";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { Course } from "src/course/domain/Course";
import { Model } from "mongoose";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { OdmCourseEntity } from "../../entities/odm-entities/odm-course.entity";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { OdmLessonCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.lesson.entity";
import { OdmCourseRepository } from "../../repositories/OdmCourse.repository";
import { UserId } from "src/user/domain/value-objects/user-id";

export class OdmLessonMapper {
  static async toDomain(entity: OdmLessonEntity) {

    let courseModel = new Model<OdmCourseEntity>;
    let categoryModel = new Model<OdmCategoryEntity>;
    let trainerModel = new Model<OdmTrainerEntity>;
    let tagModel = new Model<OdmTagEntity>;
    let lessonModel = new Model<OdmLessonEntity>;
    let commentModel = new Model<OdmLessonCommentEntity>

    let courseRepo: OdmCourseRepository = new OdmCourseRepository( courseModel, categoryModel, trainerModel, tagModel, lessonModel,commentModel)
    
    let course = await courseRepo.getCourseByLessonId(LessonId.create(entity.id));

    let lesson = course.Lessons.find(lesson => lesson.id.Value === entity.id);

    let comments = lesson.comments;

    return new Lesson(
      new LessonId(entity.id),
      new LessonTitle(entity.title),
      new LessonContent(entity.content),
      new LessonDuration(entity.seconds),
      new LessonVideo(entity.video),
      comments,
    );
  }

  static toPersistence(lesson:Lesson) {
    return OdmLessonEntity.create(
      lesson.id.Value,
      lesson.title.value,
      lesson.content.value,
      lesson.seconds.value,
      lesson.video.Value
    )
  }
}