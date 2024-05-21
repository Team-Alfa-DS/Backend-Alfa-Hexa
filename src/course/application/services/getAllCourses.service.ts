import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";

export class GetAllCoursesService /*implements Service<void, Promise<Course[]>*/ {
  constructor(private readonly courseRepository: ICourseRepository){}

  execute(): Promise<Course[]> {
    return this.courseRepository.getAllCourses();
  }
}