import { Lesson } from "src/course/domain/Lesson";
import { LessonEntity } from "../entities/lesson.entity";

export class LessonMapper {
  static toDomain(entity: LessonEntity): Lesson {
    const lesson = new Lesson(
      entity.id,
      entity.title,
      entity.content,
      entity.video,
      entity.image
    );
    return lesson;
  }
}