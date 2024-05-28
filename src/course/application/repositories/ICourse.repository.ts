import { Course } from "src/course/domain/Course";

export interface ICourseRepository {
  getManyCourses(filter?: string, category?: string, trainer?: string, page?: number, perpage?: number): Promise<Course[]>;
  getCourseById(courseId: string): Promise<Course>;
}