import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { Course } from "src/course/domain/Course";
import { DataSource, Repository } from "typeorm";
import { OrmCourseEntity } from "../entities/orm-entities/orm-course.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { CourseMapper } from "../mappers/course.mapper";
import { Result } from "src/common/domain/result-handler/result";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
import { Uuid } from "src/common/domain/value-objects/Uuid";

export class TOrmCourseRepository extends Repository<OrmCourseEntity> implements ICourseRepository {
  constructor(database: DataSource){
    super(OrmCourseEntity, database.manager)
  }

  async getManyCourses(filter?: string[], category?: string, trainer?: string, page?: number, perpage?: number): Promise<Result<Course[]>> {
    let result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true,
      }
    });
    
    if (perpage) { 
      if (!page) {page = 0};

      result = result.slice((page*perpage), ((perpage) + page*perpage));
    }

    let courses = CourseMapper.arrayToDomain(result);
    
    if (filter) {
      for (let tag of filter) {
        if (tag) {
          courses = courses.filter((course) => course.containsTag(tag)); //Tags.includes(new CourseTag(tag))
        } 
      }
      // courses = courses.filter((course) => course.tags.includes(filter))
    }
    if (category) {courses = courses.filter((course) => course.Category.equals(new CourseCategory(category)))} //Aplicar los filtros que correspondan
    if (trainer) {courses = courses.filter((course) => course.Trainer.equals(new CourseTrainer(trainer)))}

    if (courses.length > 0) {

      return Result.success(courses);
    } else {
      return Result.fail(new Error(`No se encontraron Cursos con la búsqueda: ${filter} | ${category} | ${trainer} | page: ${page} | perpage: ${perpage}`))
    }
  }

  async getCourseById(courseId: string): Promise<Result<Course>> {
    const result = await this.findOne({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true
      }, 
      where: {
        id: courseId
      }
    });

    if (result) {
      const course = CourseMapper.toDomain(result);
      return Result.success(course);
    } else {
      return Result.fail(new Error(`No se encontró el Curso con el id: ${courseId}`));
    }
  }


  async getCoursesByTag(tag: string): Promise<Result<Course[]>> {
    const result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true
      }
    });

    let courses = CourseMapper.arrayToDomain(result);
    courses = courses.filter((course) => course.containsTag(tag));

    if (courses.length > 0) {

      return Result.success(courses);
    } else {
      return Result.fail(new Error(`No se encontraron cursos con Tag: ${tag}`));
    }
  }

  async getCourseByLessonId(lessonId: string): Promise<Result<Course>> {
    const result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true
      }
    });

    for (let course of result) {
      for (let lesson of course.lessons) {
        if (lesson.id === lessonId) {
          return Result.success(CourseMapper.toDomain(course));
        }
      }
    }
    return Result.fail(new Error(`No se encontró el curso dado la lección: ${lessonId}`));
  }

  async getAllCourses(page?: number, perpage?: number): Promise<Result<Course[]>> {
    let result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true,
      }
    });

    if (perpage) { 
      if (!page) {page = 0};

      result = result.slice((page*perpage), ((perpage) + page*perpage));
    }

    if (result.length >= 0) {
      const courses = CourseMapper.arrayToDomain(result);
      return Result.success(courses);
    } else {
      return Result.fail(new Error(`No se encontraron cursos`));
    }
  }

  async getCourseCount(category: string, trainerId: string): Promise<Result<number>> {
    let result = await this.find({
      relations: {
        category: true,
        trainer: true
      }
    })
    if (result.length == 0) {return Result.success(0)}   //{return Result.fail(new Error('No se encontraron Cursos'), HttpStatus.BAD_REQUEST, `No se encontraron Cursos`)}
    const courses = CourseMapper.arrayToDomain(result);
    
    courses.filter((course) => course.Category.equals(new CourseCategory(category)))
    courses.filter((course) => course.Trainer.equals(new CourseTrainer(trainerId)))
    
    return Result.success(courses.length)
  }
}