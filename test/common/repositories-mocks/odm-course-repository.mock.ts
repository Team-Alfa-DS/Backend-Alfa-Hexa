// import { Course } from "src/course/domain/Course";
// import { Lesson } from "src/course/domain/entities/Lesson";
// import { ICourseRepository } from "../../../src/course/domain/repositories/ICourse.repository";
// import { CourseCategory } from "src/course/domain/value-objects/course-category";
// import { CourseDescription } from "src/course/domain/value-objects/course-description";
// import { CourseDurationMinutes } from "src/course/domain/value-objects/course-durationMinutes";
// import { CourseDurationWeeks } from "src/course/domain/value-objects/course-durationWeeks";
// import { CourseId } from "src/course/domain/value-objects/course-id";
// import { CourseImage } from "src/course/domain/value-objects/course-image";
// import { CourseLevel } from "src/course/domain/value-objects/course-level";
// import { CourseTag } from "src/course/domain/value-objects/course-tag";
// import { CourseTitle } from "src/course/domain/value-objects/course-title";
// import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
// import { LessonContent } from "src/course/domain/value-objects/lesson-content";
// import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
// import { LessonId } from "src/course/domain/value-objects/lesson-id";
// import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
// import { LessonVideo } from "src/course/domain/value-objects/lesson-video";
// import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";

// export class OdmCourseRepositoryMock implements ICourseRepository {

//     private readonly coursesOdm: OdmCourseEntity[] = [
//         {
//             id: '4a370052-3c3d-4a18-9ba1-a9fd5336a145',
//             description: 'una descripcion',
//             image: 'https://res.cloudinary.com/dhrnlh0kg/image/upload/v1718305862/dy0o7ppdrquv4rjtkyn8.jpg',
//             level: 'Principiante',
//             minutes: 30,
//             name: 'Yoga para Principiantes',
//             publication_date: new Date(),
//             weeks: 1,
//             category: {
//                 id: 'ca701b5b-0e6b-41a8-99d5-c1faeef6d5cf',
//                 icon: 'https://www.placeholder.com',
//                 name: 'Yoga'
//             },
//             lessons: [{
//                 id: '62d3f486-3563-4525-acc4-4c0b22998c65',
//                 content: 'Contenido',
//                 seconds: 300,
//                 title: 'leccion 1',
//                 video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/lfc9awszmicb9k02uzkd.mp4'
//             }],
//             trainer: {
//                 id: 'dc20a55c-791a-434d-9791-c0e119251968',
//                 location: 'placeholder',
//                 name: 'Roman Peterson',
//                 followers: []
//             },
//             tags: []
//         }
//     ]

//     getManyCourses(filter?: CourseTag[], category?: CourseCategory, trainer?: CourseTrainer): Promise<Course[]> {
//         throw new Error("Method not implemented.");
//     }

//     getCourseById(courseId: CourseId): Promise<Course> {
//         throw new Error("Method not implemented.");
//     }

//     getCoursesByTag(tag: CourseTag): Promise<Course[]> {
//         throw new Error("Method not implemented.");
//     }

//     async getCourseByLessonId(lessonId: LessonId): Promise<Course> {
//         const course = this.coursesOdm.find(course => course.lessons.find(lesson => lesson.id === lessonId.Value));

//         const lessonList: Lesson[] = []; 
//         for (const lesson of course.lessons) {
//             lessonList.push(
//                 {
//                     id: new LessonId(lesson.id),
//                     content: new LessonContent(lesson.content),
//                     seconds: new LessonDuration(lesson.seconds),
//                     title: new LessonTitle(lesson.title),
//                     video: new LessonVideo(lesson.video),
//                 }
//             )
//         }

//         const courseDomain = Course.create(
//             new CourseId(course.id),
//             new CourseTitle(course.name),
//             new CourseDescription(course.description),
//             new CourseImage(course.image),
//             course.publication_date,
//             new CourseDurationMinutes(course.minutes),
//             new CourseDurationWeeks(course.weeks),
//             new CourseLevel(course.level),
//             lessonList,
//             [],
//             new CourseCategory(course.category.id),
//             new CourseTrainer(course.trainer.id)
//         );

//         return courseDomain
//     }

//     getAllCourses(): Promise<Course[]> {
//         throw new Error("Method not implemented.");
//     }

//     getCourseCount(category: CourseCategory, trainerId: CourseTrainer): Promise<number> {
//         throw new Error("Method not implemented.");
//     }

//     saveCourse(course: Course): Promise<Course> {
//         throw new Error("Method not implemented.");
//     }

//     saveLesson(lesson: Lesson, course: Course): Promise<Lesson> {
//         throw new Error("Method not implemented.");
//     }

// }