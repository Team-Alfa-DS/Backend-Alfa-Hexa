import { Course } from "src/course/domain/aggregates/Course";
import { CourseEntity } from "../entities/course.entity";
import { LessonMapper } from "./lesson.mapper";
import { Lesson } from "src/course/domain/entities/Lesson";
import { Uuid } from "src/course/domain/value-objects/Uuid";
import { CourseTitle } from "src/course/domain/value-objects/course-title";
import { CourseDescription } from "src/course/domain/value-objects/course-description";
import { Url } from "src/course/domain/value-objects/url";
import { CourseDurationMinutes } from "src/course/domain/value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "src/course/domain/value-objects/course-durationWeeks";
import { CourseLevel } from "src/course/domain/value-objects/course-level";

export class CourseMapper {
  static toDomain(entity: CourseEntity): Course {
    const domainLessons: Lesson[] = []; 
    for (let lesson of entity.lessons) {
      
      domainLessons.push(LessonMapper.toDomain(lesson));
    }
    const domainTags: string[] = [];
    for (let tag of entity.tags) {
      domainTags.push(tag.name);
    }
    const course = new Course(
      new Uuid(entity.id),
      new CourseTitle(entity.name),
      new CourseDescription(entity.description),
      new Url(entity.image),
      entity.publication_date,
      new CourseDurationMinutes(entity.minutes),
      new CourseDurationWeeks(entity.weeks),
      new CourseLevel(entity.level),
      domainLessons,
      domainTags,
      entity.category.name,
      {id: entity.trainer.id, name: entity.trainer.name}
    );

    return course;
  }

  static arrayToDomain(entities: CourseEntity[]): Course[] {
    const courses: Course[] = [];
      for (let entity of entities) {
        courses.push(CourseMapper.toDomain(entity));
      }
    return courses;
  }
}