import { Result } from "src/common/domain/result-handler/result";
import { Course } from "src/course/domain/aggregates/Course";

export interface ICourseRepository {
  getManyCourses(filter?: string[], category?: string, trainer?: string, page?: number, perpage?: number): Promise<Result<Course[]>>;
  getCourseById(courseId: string): Promise<Result<Course>>;
  getCoursesByTag(tag: string): Promise<Result<Course[]>>;
  getCourseByLessonId(lessonId: string): Promise<Result<Course>>;
  getAllCourses(page?: number, perpage?: number): Promise<Result<Course[]>>;
  getCourseCount(category: string, trainerId: string): Promise<Result<number>>;
}