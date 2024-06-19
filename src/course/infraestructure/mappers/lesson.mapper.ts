import { Lesson } from "src/course/domain/entities/Lesson";
import { LessonEntity } from "../entities/lesson.entity";
import { Uuid } from "src/course/domain/value-objects/Uuid";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { Url } from "src/course/domain/value-objects/url";

export class LessonMapper {
  static toDomain(entity: LessonEntity): Lesson {
    const lesson = new Lesson(
      new Uuid(entity.id),
      new LessonTitle(entity.title),
      new LessonContent(entity.content),
      new LessonDuration(entity.seconds),
      new Url(entity.video),
      new Url(entity.image)
    );
    return lesson;
  }
}