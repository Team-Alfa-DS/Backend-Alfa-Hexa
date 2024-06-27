import { Lesson } from "src/course/domain/entities/Lesson";
import { LessonEntity } from "../entities/lesson.entity";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { LessonVideo } from "src/course/domain/value-objects/lesson-video";

export class LessonMapper {
  static toDomain(entity: LessonEntity): Lesson {
    const lesson = new Lesson(
      new Uuid(entity.id),
      new LessonTitle(entity.title),
      new LessonContent(entity.content),
      new LessonDuration(entity.seconds),
      new LessonVideo(entity.video),
    );
    return lesson;
  }
}