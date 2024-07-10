import { Lesson } from "src/course/domain/entities/Lesson";
import { OrmLessonEntity } from "../../entities/orm-entities/orm-lesson.entity";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { LessonVideo } from "src/course/domain/value-objects/lesson-video";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { Course } from "src/course/domain/Course";
import { OrmLessonCommentMapper } from "./orm-comment-lesson.mapper";
import { CommentLesson } from "src/course/domain/entities/comment-lesson";

export class OrmLessonMapper {
  
  static toDomain(entity: OrmLessonEntity): Lesson {
    // const ormLessonCommmentMapper = new OrmLessonCommentMapper();
    
    let domainComments: CommentLesson[] = [];

    // entity.comments.forEach(async (comment) => {
    //   domainComments.push(await OrmLessonCommentMapper.toDomain(comment))
    // });
    
    if (entity.comments) {
      for (let comment of entity.comments) {
        domainComments.push( OrmLessonCommentMapper.toDomain(comment));
      }
    }
    
    return new Lesson(
      new LessonId(entity.id),
      new LessonTitle(entity.title),
      new LessonContent(entity.content),
      new LessonDuration(entity.seconds),
      new LessonVideo(entity.video),
      domainComments
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