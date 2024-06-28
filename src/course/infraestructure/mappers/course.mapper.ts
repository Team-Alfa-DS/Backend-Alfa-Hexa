import { Course } from "src/course/domain/Course";
import { CourseEntity } from "../entities/course.entity";
import { LessonMapper } from "./lesson.mapper";
import { Lesson } from "src/course/domain/entities/Lesson";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { CourseTitle } from "src/course/domain/value-objects/course-title";
import { CourseDescription } from "src/course/domain/value-objects/course-description";
import { Url } from "src/common/domain/value-objects/url";
import { CourseDurationMinutes } from "src/course/domain/value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "src/course/domain/value-objects/course-durationWeeks";
import { CourseLevel } from "src/course/domain/value-objects/course-level";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { CourseImage } from "src/course/domain/value-objects/course-image";

export class CourseMapper {
  static toDomain(entity: CourseEntity): Course {
    const domainLessons: Lesson[] = []; 
    for (let lesson of entity.lessons) {
      
      domainLessons.push(LessonMapper.toDomain(lesson));
    }
    const domainTags: CourseTag[] = [];
    for (let tag of entity.tags) {
      domainTags.push(new CourseTag(tag.name));
    }
    const course = new Course(
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