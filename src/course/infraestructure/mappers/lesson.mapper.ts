import { Lesson } from "src/course/domain/entities/Lesson";
import { OrmLessonEntity } from "../entities/orm-entities/orm-lesson.entity";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { Url } from "src/common/domain/value-objects/url";

export class LessonMapper {
  static toDomain(entity: OrmLessonEntity): Lesson {
    let videoUrl: Url, imageUrl: Url = undefined;
    if (entity.video) {videoUrl = new Url(entity.video)}
    if (entity.image) {imageUrl = new Url(entity.image)}
    const lesson = new Lesson(
      new Uuid(entity.id),
      new LessonTitle(entity.title),
      new LessonContent(entity.content),
      new LessonDuration(entity.seconds),
      videoUrl,
      imageUrl
    );
    return lesson;
  }
}