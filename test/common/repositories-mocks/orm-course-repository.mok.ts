import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { Course } from "src/course/domain/Course";
import { CommentLesson } from "src/course/domain/entities/comment-lesson";
import { Lesson } from "src/course/domain/entities/Lesson";
import { ICourseCommandRepository } from "src/course/domain/repositories/ICourseCommand.repository";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
import { LessonId } from "src/course/domain/value-objects/lesson-id";



export class OrmCourseRepositoryMock implements ICourseCommandRepository {
    private courses: Course[] = [];
    private lessons: Lesson[] = [];
    private comments: CommentLesson[] = [];

    async saveCourse(course: Course): Promise<Course> {
        this.courses.push(course);
        return course;
    }

    async saveLesson(lesson: Lesson, course: Course): Promise<Lesson> {
        this.lessons.push(lesson);
        return lesson;
    }

    async saveComment(comment: CommentLesson): Promise<CommentLesson> {
        this.comments.push(comment);
        return comment;
    }

    async getManyCourses(filter?: CourseTag[], category?: CourseCategory, trainer?: CourseTrainer): Promise<Course[]> {
        // Implement logic to filter courses based on the provided parameters
        // and return the filtered courses
        return this.courses;
    }

    async getCourseById(courseId: CourseId): Promise<Course> {
        // Implement logic to find a course by its ID
        // and return the course if found, otherwise throw an error
        const course = this.courses.find(c => c.Id.equals(courseId));
        if (course) {
            return course;
        } else {
            throw new Error("Course not found");
        }
    }

    async getCoursesByTag(tag: CourseTag): Promise<Course[]> {
        // Implement logic to find courses by tag
        // and return the matching courses
        return this.courses.filter(c => c.Tags.includes(tag));
    }

    async getCourseByLessonId(lessonId: LessonId): Promise<Course> {
        // Implement logic to find the course associated with the given lesson ID
        // and return the course if found, otherwise throw an error
        //const lesson = this.lessons.find(l => l.id.equals(lessonId));
        //if (lesson) {
        //    const course = this.courses.find(c => c.Id.equals(lesson.id));
        //    if (course) {
        //        return course;
        //    }
        //}
        throw new Error("Course not found");
    }

    async getAllCourses(): Promise<Course[]> {
        // Return all courses
        return this.courses;
    }

    async getCourseCount(category: CourseCategory, trainerId: CourseTrainer): Promise<number> {
        // Implement logic to count the number of courses based on the provided category and trainer ID
        // and return the count
        return this.courses.filter(c => c.Category.equals(category) && c.Trainer.equals(trainerId)).length;
    }

    async findAllCommentsByLessonId(id: LessonCommentLessonId): Promise<CommentLesson[]> {
        // Implement logic to find all comments associated with the given lesson ID
        // and return the comments
        return this.comments.filter(c => c.LessonId.equals(id));
    }
}