import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { Course } from "../Course";
import { Lesson } from "../entities/Lesson";
import { CourseCategory } from "../value-objects/course-category";
import { CourseId } from "../value-objects/course-id";
import { CourseTag } from "../value-objects/course-tag";
import { CourseTrainer } from "../value-objects/course-trainer";
import { LessonId } from "../value-objects/lesson-id";
import { CommentLesson } from "../entities/comment-lesson";
import { CourseTitle } from "../value-objects/course-title";

export interface ICourseQueryRepository {
  getManyCourses(filter?: CourseTag[], category?: CourseCategory, trainer?: CourseTrainer): Promise<Course[]>;
  getCourseById(courseId: CourseId): Promise<Course>;
  getCoursesByTag(tag: CourseTag): Promise<Course[]>;
  getCourseByLessonId(lessonId: LessonId): Promise<Course>;
  getAllCourses(): Promise<Course[]>;
  getCourseCount(category: CourseCategory, trainerId: CourseTrainer): Promise<number>;
  saveCourse(course: Course): Promise<Course>;
  saveLesson(lesson: Lesson, course: Course): Promise<Lesson>;
  findAllCommentsByLessonId(id: LessonCommentLessonId): Promise<CommentLesson[]>;
  saveComment(comment: CommentLesson): Promise<CommentLesson>;
  getCourseByTitle(title: CourseTitle): Promise<boolean>;
}