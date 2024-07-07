import { Lesson } from "src/course/domain/entities/Lesson";
import { OdmLessonEntity } from "../../entities/odm-entities/odm-lesson.entity";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { LessonVideo } from "src/course/domain/value-objects/lesson-video";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { Course } from "src/course/domain/Course";

export class OdmLessonMapper {
  static toDomain(entity: OdmLessonEntity) {
    return new Lesson(
      new LessonId(entity.id),
      new LessonTitle(entity.title),
      new LessonContent(entity.content),
      new LessonDuration(entity.seconds),
      new LessonVideo(entity.video),
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