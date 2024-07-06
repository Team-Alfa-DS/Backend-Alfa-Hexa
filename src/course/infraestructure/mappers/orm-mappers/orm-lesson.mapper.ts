import { Lesson } from "src/course/domain/entities/Lesson";
import { OrmLessonEntity } from "../../entities/orm-entities/orm-lesson.entity";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { LessonVideo } from "src/course/domain/value-objects/lesson-video";
import { LessonId } from "src/course/domain/value-objects/lesson-id";

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
}