import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";

export class GetCourseById /*implements Service<string, Promise<Course[]>*/ {
  constructor(private readonly courseRepository: ICourseRepository){}

  execute(courseId: string): Promise<Course> {
    return this.courseRepository.getCourseById(courseId);
  }
}