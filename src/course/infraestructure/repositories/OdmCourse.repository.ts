import { Model } from "mongoose";
import { OdmCourseEntity } from "../entities/odm-entities/odm-course.entity";
import { Course } from "src/course/domain/Course";
import { CourseNotFoundException } from "src/course/domain/exceptions/courseNotFound";
import { OdmCourseMapper } from "../mappers/odm-mappers/odm-course.mapper";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { Lesson } from "src/course/domain/entities/Lesson";
import { OdmLessonMapper } from "../mappers/odm-mappers/odm-lesson.mapper";
import { OdmLessonEntity } from "../entities/odm-entities/odm-lesson.entity";
import { Result } from "src/common/domain/result-handler/result";
import { LessonCommentLessonId } from "src/comment/domain/valueObjects/lesson/comment-lesson-lessonId";
import { OdmLessonCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.lesson.entity";
import { CommentsLessonNotFoundException } from "src/comment/domain/exceptions/lesson/comments-lesson-not-found-exception";
import { OdmLessonCommentMapper } from "../mappers/odm-mappers/odm-comment-lesson.mapper";
import { CommentLesson } from "src/course/domain/entities/comment-lesson";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";

export class OdmCourseRepository implements ICourseQueryRepository {
  private odmCommentMapper: OdmLessonCommentMapper;

  constructor(
    private courseModel: Model<OdmCourseEntity>,
    private categoryModel: Model<OdmCategoryEntity>,
    private trainerModel: Model<OdmTrainerEntity>,
    private tagModel: Model<OdmTagEntity>,
    private lessonModel: Model<OdmLessonEntity>,
    private commentModel: Model<OdmLessonCommentEntity>,
    private userModel: Model<OdmUserEntity>
  ){}

  async getManyCourses(filter?: CourseTag[], category?: CourseCategory, trainer?: CourseTrainer): Promise<Course[]> {
    const result = await this.courseModel.find<OdmCourseEntity>();
    if (result.length <= 0) {throw new CourseNotFoundException(`No hay cursos guardados`)}
    
    let courses = await OdmCourseMapper.arrayToDomain(result, this.commentModel);

    if (filter) {
      for (let tag of filter) {
        if (tag) {
          courses = courses.filter((course) => course.containsTag(tag));
        }
      }
    }
    if (category) {courses = courses.filter((course) => course.Category.equals(category))} //Aplicar los filtros que correspondan
    if (trainer) {courses = courses.filter((course) => course.Trainer.equals(trainer))}


    if (courses.length > 0) {

      return courses;
    } else {
      throw new CourseNotFoundException(`No se encontraron cursos con la búsqueda: ${filter} | ${category} | ${trainer}`);
    }
  }

  async getCourseById(courseId: CourseId): Promise<Course> {
    const result = await this.courseModel.findOne<OdmCourseEntity>({id: courseId.Value});

    if (!result) {throw new CourseNotFoundException(`No se encontró un curso con el id: ${courseId}`)}

    return OdmCourseMapper.toDomain(result, this.commentModel);
  }
  async getCoursesByTag(tag: CourseTag): Promise<Course[]> {
    const result = await this.courseModel.find<OdmCourseEntity>();

    if (result.length <= 0) {
      throw new CourseNotFoundException(`No hay cursos guardados`);
    }

    let courses = await OdmCourseMapper.arrayToDomain(result, this.commentModel);
    courses = courses.filter((course) => course.containsTag(tag));
    
    if (courses.length <= 0) {
      throw new CourseNotFoundException(`No se encontraron cursos con el tag: ${tag}`);
    } 
    return courses;
  }

  async getCourseByLessonId(lessonId: LessonId): Promise<Course> {
    const result = await this.courseModel.find<OdmCourseEntity>();

    if (result.length <= 0) {
      throw new CourseNotFoundException(`No hay cursos guardados`);
    }
    console.log(result); //Debug
    
    for (let course of result) { 
      for (let lesson of course.lessons) {
        if (lessonId.equals(new LessonId(lesson.id))) {
          return OdmCourseMapper.toDomain(course, this.commentModel);
        }
      }
    }
    throw new CourseNotFoundException(`No se encontró un curso que contenga la lección con id: ${lessonId}`);
  }

  async getAllCourses(): Promise<Course[]> {
    let result = await this.courseModel.find<OdmCourseEntity>();

    if (result.length <= 0) {
      throw new CourseNotFoundException(`No hay cursos guardados`);
    } else {
      return OdmCourseMapper.arrayToDomain(result, this.commentModel);
    }
  }

  async getCourseCount(category?: CourseCategory, trainerId?: CourseTrainer): Promise<number> {
    const result = await this.courseModel.find<OdmCourseEntity>();

    if (result.length == 0) {return 0}   //{return Result.fail(new Error('No se encontraron Cursos'), HttpStatus.BAD_REQUEST, `No se encontraron Cursos`)}
    let courses = await OdmCourseMapper.arrayToDomain(result, this.commentModel);
    
    if (category) {courses = courses.filter((course) => course.Category.equals(category))}
    if (trainerId) {courses = courses.filter((course) => course.Trainer.equals(trainerId))}
    
    return courses.length;
  }

  async saveCourse(course: Course): Promise<Course> {
    const OdmCourse = await OdmCourseMapper.toPersistence(course, this.categoryModel, this.trainerModel, this.tagModel);
    await this.courseModel.create(OdmCourse);
    return course;
  }

  async saveLesson(lesson:Lesson, course:Course): Promise<Lesson> {
    const OdmLesson = await OdmLessonMapper.toPersistence(lesson);
    const OdmCourse = await OdmCourseMapper.toPersistence(course, this.categoryModel, this.trainerModel, this.tagModel)
    await this.lessonModel.create(OdmLesson);


    OdmCourse.lessons.push(OdmLesson);
    
    await this.courseModel.findOneAndUpdate({id: OdmCourse.id}, OdmCourse);
    return lesson;
  }

  async saveComment (comment: CommentLesson): Promise<CommentLesson>{ 
    
    const odmComment = await OdmLessonCommentMapper.toPersistence(comment, this.userModel, this.lessonModel);
    await this.commentModel.create(odmComment);
    return comment;
  }

  

  async findAllCommentsByLessonId(id: LessonCommentLessonId): Promise<CommentLesson[]> {
    const r = await this.commentModel.find<OdmLessonCommentEntity>();

    if (r.length == 0) { throw new CommentsLessonNotFoundException('No se encontraron comentarios de lecciones') }
    
    
    let comments = await OdmLessonCommentMapper.arrayToDomain(r);
    
    comments = comments.filter((comment) => comment.LessonId.equals(id));
    if (comments.length == 0) {throw new CommentsLessonNotFoundException(`No se encontraron comentarios para la lección con Id: ${id}`)}
    return comments;
  }


}