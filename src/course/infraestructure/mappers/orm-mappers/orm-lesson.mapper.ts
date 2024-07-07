import { Lesson } from "src/course/domain/entities/Lesson";
import { OrmLessonEntity } from "../../entities/orm-entities/orm-lesson.entity";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { LessonVideo } from "src/course/domain/value-objects/lesson-video";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { Course } from "src/course/domain/Course";

export class OrmLessonMapper {
  static toDomain(entity: OrmLessonEntity): Lesson {
    return new Lesson(
      new LessonId(entity.id),
      new LessonTitle(entity.title),
      new LessonContent(entity.content),
      new LessonDuration(entity.seconds),
      new LessonVideo(entity.video),
    );
    // return lesson;
  }

  static toPersistence(lesson: Lesson, course: Course): OrmLessonEntity {
    return OrmLessonEntity.create(
      lesson.id.Value,
      lesson.title.value,
      lesson.content.value,
      lesson.seconds.value,
      lesson.video.Value,
      course.Id.Value
    )
  }
}