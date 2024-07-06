import { Course } from "src/course/domain/Course";
import { OrmCourseEntity } from "../../entities/orm-entities/orm-course.entity";
import { OrmLessonMapper } from "./orm-lesson.mapper";
import { Lesson } from "src/course/domain/entities/Lesson";
import { CourseTitle } from "src/course/domain/value-objects/course-title";
import { CourseDescription } from "src/course/domain/value-objects/course-description";
import { CourseDurationMinutes } from "src/course/domain/value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "src/course/domain/value-objects/course-durationWeeks";
import { CourseLevel } from "src/course/domain/value-objects/course-level";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { CourseImage } from "src/course/domain/value-objects/course-image";

export class OrmCourseMapper {
  static toDomain(entity: OrmCourseEntity): Course {
    const domainLessons: Lesson[] = []; 
    for (let lesson of entity.lessons) {
      
      domainLessons.push(OrmLessonMapper.toDomain(lesson));
    }
    const domainTags: CourseTag[] = [];
    for (let tag of entity.tags) {
      domainTags.push(new CourseTag(tag.name));
    }
    return new Course(
      new CourseId(entity.id),
      new CourseTitle(entity.name),
      new CourseDescription(entity.description),
      new CourseImage(entity.image),
      entity.publication_date,
      new CourseDurationMinutes(entity.minutes),
      new CourseDurationWeeks(entity.weeks),
      new CourseLevel(entity.level),
      domainLessons,
      domainTags,
      new CourseCategory(entity.category.id),
      new CourseTrainer(entity.trainer.id)
    );

    // return course;
  }

  static arrayToDomain(entities: OrmCourseEntity[]): Course[] {
    const courses: Course[] = [];
      for (let entity of entities) {
        courses.push(OrmCourseMapper.toDomain(entity));
      }
    return courses;
  }
}