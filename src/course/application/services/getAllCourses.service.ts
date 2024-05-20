import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";

export class getAllCoursesService /*implements Service<void, Promise<Course[]>*/ {
  constructor(private readonly courseRepository: ICourseRepository){}

  execute(): Promise<Course[]> {
    return this.courseRepository.getAllCourses();
  }
}