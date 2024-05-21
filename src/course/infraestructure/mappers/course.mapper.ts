import { Course } from "src/course/domain/Course";
import { CourseEntity } from "../entities/course.entity";
import { LessonMapper } from "./lesson.mapper";
import { Lesson } from "src/course/domain/Lesson";

export class CourseMapper {
  static toDomain(entity: CourseEntity): Course {
    const domainLessons: Lesson[] = []; 
    for (let lesson of entity.lessons) {
      
      domainLessons.push(LessonMapper.toDomain(lesson));
    }
    // const domainTags: Tag[] = [];
    // for (let tag of entity.tags) {
    //   domainTags.push(TagMapper.toDomain(tag));
    // }
    const course = new Course(
      entity.id,
      entity.name,
      entity.description,
      entity.image,
      entity.publication_date,
      entity.minutes,
      entity.weeks,
      domainLessons
      //domainTags,
      //CategoryMapper.toDomain(entity.category);
      //TrainerMapper.toDomain(entity.trainer)
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