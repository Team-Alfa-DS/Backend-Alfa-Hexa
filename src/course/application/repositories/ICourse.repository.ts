import { Course } from "src/course/domain/Course";

export interface ICourseRepository {
  getAllCourses(): Promise<Course[]>;
  getCourseById(courseId: string): Promise<Course>;
}