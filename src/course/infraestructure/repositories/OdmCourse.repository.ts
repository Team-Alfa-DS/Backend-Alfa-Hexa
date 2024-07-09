import { Model } from "mongoose";
import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";
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
import { CommentLesson } from "src/comment/domain/comment-lesson";
import { CommentsLessonNotFoundException } from "src/comment/domain/exceptions/lesson/comments-lesson-not-found-exception";
import { OdmLessonCommentMapper } from "../mappers/odm-mappers/odm-comment-lesson.mapper";

export class OdmCourseRepository implements ICourseRepository {
  private odmCommentMapper: OdmLessonCommentMapper;

  constructor(
    private courseModel: Model<OdmCourseEntity>,
    private categoryModel: Model<OdmCategoryEntity>,
    private trainerModel: Model<OdmTrainerEntity>,
    private tagModel: Model<OdmTagEntity>,
    private lessonModel: Model<OdmLessonEntity>,
    private commentModel: Model<OdmLessonCommentEntity>
  ){}

  async getManyCourses(filter?: CourseTag[], category?: CourseCategory, trainer?: CourseTrainer): Promise<Course[]> {
    const result = await this.courseModel.find<OdmCourseEntity>();
    // const result = await this.courseModel.aggregate<OdmCourseEntity>([
    //   {
    //     $lookup: {
    //       from: 'category',
    //       localField: 'category',
    //       foreignField: '_id',
    //       as: 'category'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'lesson',
    //       localField: 'lessons',
    //       foreignField: '_id',
    //       as: 'lessons'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'trainer',
    //       localField: 'trainer',
    //       foreignField: '_id',
    //       as: 'trainer'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'tag',
    //       localField: 'tags',
    //       foreignField: '_id',
    //       as: 'tags'
    //     }
    //   }
    // ]);

    if (result.length <= 0) {throw new CourseNotFoundException(`No hay cursos guardados`)}
    console.log(result);
    
    let courses = await OdmCourseMapper.arrayToDomain(result);

    if (filter) {
      for (let tag of filter) {
        if (tag) {
          courses = courses.filter((course) => course.containsTag(tag));
        }
      }
    }
    if (category) {courses = courses.filter((course) => course.Category.equals(category))} //Aplicar los filtros que correspondan
    if (trainer) {courses = courses.filter((course) => course.Trainer.equals(trainer))}

    // if (perpage) { 
    //   if (!page) {page = 0};

    //   courses = courses.slice((page*perpage), ((perpage) + page*perpage));
    // }

    if (courses.length > 0) {

      return courses;
    } else {
      throw new CourseNotFoundException(`No se encontraron cursos con la búsqueda: ${filter} | ${category} | ${trainer}`);
      // return Result.fail(new Error(`No se encontraron Cursos con la búsqueda: ${filter} | ${category} | ${trainer} | page: ${page} | perpage: ${perpage}`))
    }
  }

  async getCourseById(courseId: CourseId): Promise<Course> {
    const result = await this.courseModel.findOne<OdmCourseEntity>({id: courseId.Value});
    // const result = await this.courseModel.aggregate<OdmCourseEntity>([
    //   {
    //     $lookup: {
    //       from: 'category',
    //       localField: 'category',
    //       foreignField: '_id',
    //       as: 'category'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'lesson',
    //       localField: 'lessons',
    //       foreignField: '_id',
    //       as: 'lessons'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'trainer',
    //       localField: 'trainer',
    //       foreignField: '_id',
    //       as: 'trainer'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'tag',
    //       localField: 'tags',
    //       foreignField: '_id',
    //       as: 'tags'
    //     }
    //   },
    //   {
    //     $match: {
    //       'course.id': {'$eq': courseId}
    //     }
    //   }
    // ]);

    if (!result) {throw new CourseNotFoundException(`No se encontró un curso con el id: ${courseId}`)}

    return OdmCourseMapper.toDomain(result);
  }
  async getCoursesByTag(tag: CourseTag): Promise<Course[]> {
    const result = await this.courseModel.find<OdmCourseEntity>();
    // const result = await this.courseModel.aggregate<OdmCourseEntity>([
    //   {
    //     $lookup: {
    //       from: 'category',
    //       localField: 'category',
    //       foreignField: '_id',
    //       as: 'category'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'lesson',
    //       localField: 'lessons',
    //       foreignField: '_id',
    //       as: 'lessons'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'trainer',
    //       localField: 'trainer',
    //       foreignField: '_id',
    //       as: 'trainer'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'tag',
    //       localField: 'tags',
    //       foreignField: '_id',
    //       as: 'tags'
    //     }
    //   }
    // ]);

    if (result.length <= 0) {
      throw new CourseNotFoundException(`No hay cursos guardados`);
    }

    let courses = await OdmCourseMapper.arrayToDomain(result);
    courses = courses.filter((course) => course.containsTag(tag));
    
    if (courses.length <= 0) {
      throw new CourseNotFoundException(`No se encontraron cursos con el tag: ${tag}`);
    } 
    return courses;
  }

  async getCourseByLessonId(lessonId: LessonId): Promise<Course> {
    const result = await this.courseModel.find<OdmCourseEntity>();
    // const result = await this.courseModel.aggregate<OdmCourseEntity>([
    //   {
    //     $lookup: {
    //       from: 'category',
    //       localField: 'category',
    //       foreignField: '_id',
    //       as: 'category'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'lesson',
    //       localField: 'lessons',
    //       foreignField: '_id',
    //       as: 'lessons'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'trainer',
    //       localField: 'trainer',
    //       foreignField: '_id',
    //       as: 'trainer'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'tag',
    //       localField: 'tags',
    //       foreignField: '_id',
    //       as: 'tags'
    //     }
    //   }
    // ]);

    if (result.length <= 0) {
      throw new CourseNotFoundException(`No hay cursos guardados`);
    }

    for (let course of result) { 
      for (let lesson of course.lessons) {
        if (lessonId.equals(new LessonId(lesson.id))) {
          return OdmCourseMapper.toDomain(course);
        }
      }
    }
    throw new CourseNotFoundException(`No se encontró un curso que contenga la lección con id: ${lessonId}`);
  }

  async getAllCourses(): Promise<Course[]> {
    let result = await this.courseModel.find<OdmCourseEntity>();
    // let result = await this.courseModel.aggregate<OdmCourseEntity>([
    //   {
    //     $lookup: {
    //       from: 'category',
    //       localField: 'category',
    //       foreignField: '_id',
    //       as: 'category'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'lesson',
    //       localField: 'lessons',
    //       foreignField: '_id',
    //       as: 'lessons'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'trainer',
    //       localField: 'trainer',
    //       foreignField: '_id',
    //       as: 'trainer'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'tag',
    //       localField: 'tags',
    //       foreignField: '_id',
    //       as: 'tags'
    //     }
    //   }
    // ]);

    // if (result.length <= 0) {
    //   throw new CourseNotFoundException(`No hay cursos guardados`);
    // }

    // if (perpage) { 
    //   if (!page) {page = 0};

    //   result = result.slice((page*perpage), ((perpage) + page*perpage));
    // }

    if (result.length <= 0) {
      // return Result.fail(new Error(`No se encontraron cursos`));
      throw new CourseNotFoundException(`No hay cursos guardados`);
      // throw new CourseNotFoundException("No se encontraron cursos para la página");
    } else {
      // const courses = CourseMapper.arrayToDomain(result);
      // return courses;
      return OdmCourseMapper.arrayToDomain(result);
    }
  }

  async getCourseCount(category?: CourseCategory, trainerId?: CourseTrainer): Promise<number> {
    const result = await this.courseModel.find<OdmCourseEntity>();
    // const result = await this.courseModel.aggregate<OdmCourseEntity>([
    //   {
    //     $lookup: {
    //       from: 'category',
    //       localField: 'category',
    //       foreignField: '_id',
    //       as: 'category'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'trainer',
    //       localField: 'trainer',
    //       foreignField: '_id',
    //       as: 'trainer'
    //     }
    //   }
    // ]);

    if (result.length == 0) {return 0}   //{return Result.fail(new Error('No se encontraron Cursos'), HttpStatus.BAD_REQUEST, `No se encontraron Cursos`)}
    let courses = await OdmCourseMapper.arrayToDomain(result);
    
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

  async saveComment (comment: CommentLesson): Promise<Result<CommentLesson>>{ 
      const odmComment = await this.odmCommentMapper.toPersistence(comment);
      await this.commentModel.create(odmComment);
      return Result.success<CommentLesson>(comment);
    }

  

  async findAllCommentsByLessonId(id: LessonCommentLessonId): Promise<Result<CommentLesson[]>> {
    try{
        const r = await this.commentModel.find<OdmLessonCommentEntity>();
        
        if (!r) return Result.fail<CommentLesson[]>(new CommentsLessonNotFoundException( 
            `Ha ocurrido un error al encontrar los comentarios` ));
        
        const comment = r.filter(e => e.lesson.id === id.LessonId.Value)

        const ListMapper = []
        comment.forEach(async e => {
            ListMapper.push( 
                await this.odmCommentMapper.toDomain(e ))
        });
    
        
        return Result.success<CommentLesson[]>(ListMapper);
    }catch(err){
        return Result.fail(new Error(err.message));
    }
}


}