import { Result } from "src/common/domain/result-handler/result";
import { Course } from "src/course/domain/Course";
import { CourseTag } from "../value-objects/course-tag";
import { CourseCategory } from "../value-objects/course-category";
import { CourseTrainer } from "../value-objects/course-trainer";
import { CourseId } from "../value-objects/course-id";
import { LessonId } from "../value-objects/lesson-id";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Lesson } from "../entities/Lesson";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlog } from "src/comment/domain/comment-blog";
import { CommentLesson } from "src/comment/domain/comment-lesson";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";

export interface ICourseRepository {
  // getManyCourses(filter?: string[], category?: string, trainer?: string, page?: number, perpage?: number): Promise<Result<Course[]>>;
  // getCourseById(courseId: string): Promise<Result<Course>>;
  // getCoursesByTag(tag: string): Promise<Result<Course[]>>;
  // getCourseByLessonId(lessonId: string): Promise<Result<Course>>;
  // getAllCourses(page?: number, perpage?: number): Promise<Result<Course[]>>;
  // getCourseCount(category: string, trainerId: string): Promise<Result<number>>;
  getManyCourses(filter?: CourseTag[], category?: CourseCategory, trainer?: CourseTrainer): Promise<Course[]>;
  getCourseById(courseId: CourseId): Promise<Course>;
  getCoursesByTag(tag: CourseTag): Promise<Course[]>;
  getCourseByLessonId(lessonId: LessonId): Promise<Course>;
  getAllCourses(): Promise<Course[]>;
  getCourseCount(category: CourseCategory, trainerId: CourseTrainer): Promise<number>;
  saveCourse(course: Course): Promise<Course>;
  saveLesson(lesson: Lesson, course: Course): Promise<Lesson>;
  findAllCommentsByLessonId(id: LessonCommentLessonId): Promise<Result<CommentLesson[]>>;
  saveComment(comment: CommentLesson): Promise<Result<CommentLesson>>;
}