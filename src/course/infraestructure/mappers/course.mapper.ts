import { Course } from "src/course/domain/Course";
import { CourseEntity } from "../entities/course.entity";

export class CourseMapper {
  static toDomain(entity: CourseEntity): Course {
    const course = new Course(
      entity.id,
      entity.name,
      entity.description,
      entity.image,
      entity.publication_date,
      entity.minutes,
      entity.weeks,
      entity.lessons
    )
  }
}