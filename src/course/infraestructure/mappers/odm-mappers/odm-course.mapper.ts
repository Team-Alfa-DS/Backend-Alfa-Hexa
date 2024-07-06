import { Course } from "src/course/domain/Course";
import { OdmCourseEntity } from "../../entities/odm-entities/odm-course.entity";
import { Lesson } from "src/course/domain/entities/Lesson";
import { OdmLessonMapper } from "./odm-lesson.mapper";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { CourseTitle } from "src/course/domain/value-objects/course-title";
import { CourseDescription } from "src/course/domain/value-objects/course-description";
import { CourseImage } from "src/course/domain/value-objects/course-image";
import { CourseDurationMinutes } from "src/course/domain/value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "src/course/domain/value-objects/course-durationWeeks";
import { CourseLevel } from "src/course/domain/value-objects/course-level";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";

export class OdmCourseMapper {
  static toDomain(entity: OdmCourseEntity): Course {
    const domainLessons: Lesson[] = [];
    for( let lesson of entity.lessons ) {
      domainLessons.push(OdmLessonMapper.toDomain(lesson));
    }
    const domainTags: CourseTag[] = [];
    for (let tag of entity.tags) {
      domainTags.push(new CourseTag(tag.name));
    }
    return new Course(
      new CourseId(entity.id),
      new CourseTitle(entity.title),
      new CourseDescription(entity.description),
      new CourseImage(entity.image),
      entity.date,
      new CourseDurationMinutes(entity.durationMinutes),
      new CourseDurationWeeks(entity.durationWeeks),
      new CourseLevel(entity.level),
      domainLessons,
      domainTags,
      new CourseCategory(entity.category.id),
      new CourseTrainer(entity.trainer.id)
    );
  }

  static arrayToDomain(entities: OdmCourseEntity[]): Course[] {
    const courses: Course[] = [];
      for (let entity of entities) {
        courses.push(OdmCourseMapper.toDomain(entity));
      }
    return courses;
  }
}