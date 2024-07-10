import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { OdmBlogCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.blog.entity";
import { OdmLessonCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.lesson.entity";
import { Course } from "src/course/domain/Course";
import { CommentLesson } from "src/course/domain/entities/comment-lesson";
import { Lesson } from "src/course/domain/entities/Lesson";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseDate } from "src/course/domain/value-objects/course-date";
import { CourseDescription } from "src/course/domain/value-objects/course-description";
import { CourseDurationMinutes } from "src/course/domain/value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "src/course/domain/value-objects/course-durationWeeks";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { CourseImage } from "src/course/domain/value-objects/course-image";
import { CourseLevel } from "src/course/domain/value-objects/course-level";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseTitle } from "src/course/domain/value-objects/course-title";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonVideo } from "src/course/domain/value-objects/lesson-video";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { OdmLessonEntity } from "src/course/infraestructure/entities/odm-entities/odm-lesson.entity";
import { OdmLessonCommentMapper } from "src/course/infraestructure/mappers/odm-mappers/odm-comment-lesson.mapper";
import { UserRole } from "src/user/domain/enums/role-user.type";

export class OdmCourseRepositoryMock implements ICourseQueryRepository{
    

    private readonly coursesOdm: OdmCourseEntity[] = [
        {
            id: '4a370052-3c3d-4a18-9ba1-a9fd5336a145',
            description: 'una descripcion',
            image: 'https://res.cloudinary.com/dhrnlh0kg/image/upload/v1718305862/dy0o7ppdrquv4rjtkyn8.jpg',
            level: 'Principiante',
            minutes: 30,
            name: 'Yoga para Principiantes',
            publication_date: new Date(),
            weeks: 1,
            category: {
                id: 'ca701b5b-0e6b-41a8-99d5-c1faeef6d5cf',
                icon: 'https://www.placeholder.com',
                name: 'Yoga'
            },
            lessons: [{
                id: '62d3f486-3563-4525-acc4-4c0b22998c65',
                content: 'Contenido',
                seconds: 300,
                title: 'leccion 1',
                video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/lfc9awszmicb9k02uzkd.mp4'
            }],
            trainer: {
                id: 'dc20a55c-791a-434d-9791-c0e119251968',
                location: 'placeholder',
                name: 'Roman Peterson',
                followers: []
            },
            tags: []
        }
    ]

    private readonly lessonsOdm: OdmLessonEntity[] = [{
        id: '62d3f486-3563-4525-acc4-4c0b22998c65',
        content: 'Contenido',
        seconds: 300,
        title: 'leccion 1',
        video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/lfc9awszmicb9k02uzkd.mp4'
    },
    {
        id: '62d3f486-3563-4525-acc4-4c0b22978c65',
        content: 'Contenido2',
        seconds: 370,
        title: 'leccion 2',
        video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/lfc9awszmicb9k02uzkd.mp4'
    }

    ];

    private readonly commentsOdm: OdmLessonCommentEntity[] = [{
        id: `17ae64e6-6ac4-4ca9-9272-9726578b83cf`,
        publication_date: new Date(),
        body: 'Comentario de prueba1',
        lesson: {
            id: '62d3f486-3563-4525-acc4-4c0b22998c65', 
            content: 'Contenido',
            seconds: 300,
            title: 'leccion 1',
            video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/lfc9awszmicb9k02uzkd.mp4'
        },
        user: {
            id: '244fbecc-2127-433d-ba76-762fb2fee1c8', 
            email: 'dbcd@gmail.com', 
            name: 'Daniel Bortot',
            password: '12345',
            phone: '12345678910',
            type: UserRole.CLIENT,
            image: null
        }},
        {
            id: '27f31f21-9a6a-4a6f-92a9-582e5c55a7f7',
            publication_date: new Date(),
            body: 'Comentario de prueba 2',
            lesson: {
                id: 'f8b9c50e-22f2-4b7e-b35d-71b5f108eefb', 
                content: 'Contenido de la lección 2',
                seconds: 350,
                title: 'Lección 2',
                video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/m7z3bxl9fphrs05muz2k.mp4'
            },
            user: {
                id: 'fba3f8c9-6c01-46a4-8e22-5184e56d14f6', 
                email: 'efgh@gmail.com', 
                name: 'Elena Fernandez',
                password: '54321',
                phone: '9876543210',
                type: UserRole.CLIENT,
                image: null
            }
        },
        {
            id: '8d9a16a0-8b67-4b25-8dfe-9d9bb1d29e12',
            publication_date: new Date(),
            body: 'Comentario de prueba 3',
            lesson: {
                id: 'a1c059e3-97ec-47b1-9f20-87c9fbfc0e9e', 
                content: 'Contenido de la lección 3',
                seconds: 400,
                title: 'Lección 3',
                video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/rdi7x9nol0flqh1cglwy.mp4'
            },
            user: {
                id: '7126a62c-d27d-4abf-9f3e-ebf4f2f15a62', 
                email: 'ijkl@gmail.com', 
                name: 'Ivan Kowalski',
                password: 'abc123',
                phone: '1122334455',
                type: UserRole.CLIENT,
                image: null
            }
        }
    ]

    private readonly DomainCourse: Course[] = [];
    private readonly DomainComment: CommentLesson[] = [];
    private readonly DomainLesson: Lesson[] = [];

    async findAllCommentsByLessonId(id: LessonCommentLessonId): Promise<CommentLesson[]> {
        let comments = await OdmLessonCommentMapper.arrayToDomain(this.commentsOdm);
    
        comments = comments.filter((comment) => comment.LessonId.equals(id));
        
        return comments;
    }
    async saveComment(comment: CommentLesson): Promise<CommentLesson> {
        let odmLessonComment = OdmLessonCommentEntity.create(
            comment.Id.commentId,
            comment.PublicationDate.PublicationDate,
            comment.Body.Body,
            {
                id: 'f8b9c50e-22f2-4b7e-b35d-71b5f108eefb', 
                content: 'Contenido de la lección 2',
                seconds: 350,
                title: 'Lección 2',
                video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/m7z3bxl9fphrs05muz2k.mp4'
            },
            {
                id: '7126a62c-d27d-4abf-9f3e-ebf4f2f15a62', 
                email: 'ijkl@gmail.com', 
                name: 'Ivan Kowalski',
                password: 'abc123',
                phone: '1122334455',
                type: UserRole.CLIENT,
                image: null
            }
        );
        
        this.commentsOdm.push(odmLessonComment);
        return comment;
    }

    getManyCourses(filter?: CourseTag[], category?: CourseCategory, trainer?: CourseTrainer): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }

    getCourseById(courseId: CourseId): Promise<Course> {
        throw new Error("Method not implemented.");
    }

    getCoursesByTag(tag: CourseTag): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }

    async getCourseByLessonId(lessonId: LessonId): Promise<Course> {
        const course = this.coursesOdm.find(course => course.lessons.find(lesson => lesson.id === lessonId.Value));

        const lessonList: Lesson[] = []; 
        for (const lesson of course.lessons) {
            lessonList.push(
                {
                    id: new LessonId(lesson.id),
                    content: new LessonContent(lesson.content),
                    seconds: new LessonDuration(lesson.seconds),
                    title: new LessonTitle(lesson.title),
                    video: new LessonVideo(lesson.video),
                    comments: []
                }
            )
        }

        const courseDomain = Course.create(
            new CourseId(course.id),
            new CourseTitle(course.name),
            new CourseDescription(course.description),
            new CourseImage(course.image),
            new CourseDate(course.publication_date), // Pass a CourseDate object instead of a Date object
            new CourseDurationMinutes(course.minutes),
            new CourseDurationWeeks(course.weeks),
            new CourseLevel(course.level),
            lessonList,
            [],
            new CourseCategory(course.category.id),
            new CourseTrainer(course.trainer.id)
        );

        return courseDomain
    }

    getAllCourses(): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }

    async getCourseCount(category: CourseCategory, trainerId: CourseTrainer): Promise<number> {
        return this.coursesOdm.length;
    }

    async saveCourse(course: Course): Promise<Course> {
        this.DomainCourse.push(course);
        return course;
    }

    async saveLesson(lesson: Lesson, course: Course): Promise<Lesson> {
        this.DomainLesson.push(lesson);
        return lesson;
    }

}