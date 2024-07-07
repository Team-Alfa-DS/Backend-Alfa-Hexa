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
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export class OdmCourseRepository implements ICourseRepository {
  
  constructor(
    private courseModel: Model<OdmCourseEntity>
  ){}

  async getManyCourses(filter?: CourseTag[], category?: CourseCategory, trainer?: CourseTrainer): Promise<Course[]> {
    const result = await this.courseModel.aggregate<OdmCourseEntity>([
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'lesson',
          localField: 'lessons',
          foreignField: '_id',
          as: 'lessons'
        }
      },
      {
        $lookup: {
          from: 'trainer',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer'
        }
      },
      {
        $lookup: {
          from: 'tag',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      }
    ]);

    if (result.length <= 0) {throw new CourseNotFoundException(`No hay cursos guardados`)}

    let courses = OdmCourseMapper.arrayToDomain(result);

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
    const result = await this.courseModel.aggregate<OdmCourseEntity>([
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'lesson',
          localField: 'lessons',
          foreignField: '_id',
          as: 'lessons'
        }
      },
      {
        $lookup: {
          from: 'trainer',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer'
        }
      },
      {
        $lookup: {
          from: 'tag',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $match: {
          'course.id': {'$eq': courseId}
        }
      }
    ]);

    if (result.length <= 0) {throw new CourseNotFoundException(`No se encontró un curso con el id: ${courseId}`)}

    return OdmCourseMapper.toDomain(result[0]);
  }
  async getCoursesByTag(tag: CourseTag): Promise<Course[]> {
    const result = await this.courseModel.aggregate<OdmCourseEntity>([
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'lesson',
          localField: 'lessons',
          foreignField: '_id',
          as: 'lessons'
        }
      },
      {
        $lookup: {
          from: 'trainer',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer'
        }
      },
      {
        $lookup: {
          from: 'tag',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      }
    ]);

    if (result.length <= 0) {
      throw new CourseNotFoundException(`No hay cursos guardados`);
    }

    let courses = OdmCourseMapper.arrayToDomain(result);
    courses = courses.filter((course) => course.containsTag(tag));
    
    if (courses.length <= 0) {
      throw new CourseNotFoundException(`No se encontraron cursos con el tag: ${tag}`);
    } 
    return courses;
  }
  async getCourseByLessonId(lessonId: LessonId): Promise<Course> {
    const result = await this.courseModel.aggregate<OdmCourseEntity>([
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'lesson',
          localField: 'lessons',
          foreignField: '_id',
          as: 'lessons'
        }
      },
      {
        $lookup: {
          from: 'trainer',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer'
        }
      },
      {
        $lookup: {
          from: 'tag',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      }
    ]);

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
    let result = await this.courseModel.aggregate<OdmCourseEntity>([
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'lesson',
          localField: 'lessons',
          foreignField: '_id',
          as: 'lessons'
        }
      },
      {
        $lookup: {
          from: 'trainer',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer'
        }
      },
      {
        $lookup: {
          from: 'tag',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      }
    ]);

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

  async getCourseCount(category: CourseCategory, trainerId: CourseTrainer): Promise<number> {
    const result = await this.courseModel.aggregate<OdmCourseEntity>([
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'trainer',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer'
        }
      }
    ]);

    if (result.length == 0) {return 0}   //{return Result.fail(new Error('No se encontraron Cursos'), HttpStatus.BAD_REQUEST, `No se encontraron Cursos`)}
    const courses = OdmCourseMapper.arrayToDomain(result);
    
    courses.filter((course) => course.Category.equals(category))
    courses.filter((course) => course.Trainer.equals(trainerId))
    
    return courses.length;
  }

  async saveCourse(course: Course, runner: ITransactionHandler): Promise<Course> {
    const OdmCourse = await OdmCourseMapper.toPersistence(course)
  }
}