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
import { CourseNotFoundException } from "src/course/domain/exceptions/courseNotFound";

export class TOrmCourseRepository extends Repository<OrmCourseEntity> implements ICourseRepository {
  constructor(database: DataSource){
    super(OrmCourseEntity, database.manager)
  }

  async getManyCourses(filter?: string[], category?: string, trainer?: string, page?: number, perpage?: number): Promise<Course[]> {
    let result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true,
      }
    });
    if (result.length <= 0) { throw new CourseNotFoundException(`No hay cursos guardados`)}
    

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

    if (perpage) { 
      if (!page) {page = 0};

      courses = courses.slice((page*perpage), ((perpage) + page*perpage));
    }

    if (courses.length > 0) {

      return courses;
    } else {
      throw new CourseNotFoundException(`No se encontraron Cursos con la búsqueda: ${filter} | ${category} | ${trainer} | page: ${page} | perpage: ${perpage}`);
      // return Result.fail(new Error(`No se encontraron Cursos con la búsqueda: ${filter} | ${category} | ${trainer} | page: ${page} | perpage: ${perpage}`))
    }
  }

  async getCourseById(courseId: string): Promise<Course> /*Promise<Result<Course>>*/ {
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

    if (!result) {throw new CourseNotFoundException(`No se encontró un curso con el id: ${courseId}`)}

    return CourseMapper.toDomain(result);

    // if (result) {
    //   const course = CourseMapper.toDomain(result);
    //   return Result.success(course);
    // } else {
    //   return Result.fail(new Error(`No se encontró el Curso con el id: ${courseId}`));
    // }
  }


  async getCoursesByTag(tag: string): Promise<Course[]> {
    const result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true
      }
    });
    if (result.length <= 0) {
      throw new CourseNotFoundException(`No hay cursos guardados`);
    }

    let courses = CourseMapper.arrayToDomain(result);
    courses = courses.filter((course) => course.containsTag(tag));
    
    if (courses.length <= 0) {
      throw new CourseNotFoundException(`No se encontraron cursos con el tag: ${tag}`);
    } 
    return courses;
  }

  async getCourseByLessonId(lessonId: string): Promise<Course> {
    const result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true
      }
    });
    if (result.length <= 0) {
      throw new CourseNotFoundException(`No hay cursos guardados`);
    }

    for (let course of result) {
      for (let lesson of course.lessons) {
        if (lesson.id === lessonId) {
          return CourseMapper.toDomain(course);
        }
      }
    }
    throw new CourseNotFoundException(`No se encontró un curso que contenga la lección con id: ${lessonId}`);
  }

  async getAllCourses(page?: number, perpage?: number): Promise<Course[]> {
    let result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true,
      }
    });

    if (result.length <= 0) {
      throw new CourseNotFoundException(`No hay cursos guardados`);
    }

    if (perpage) { 
      if (!page) {page = 0};

      result = result.slice((page*perpage), ((perpage) + page*perpage));
    }

    

    if (result.length <= 0) {
      // return Result.fail(new Error(`No se encontraron cursos`));
      throw new CourseNotFoundException("No se encontraron cursos para la página");
    } else {
      // const courses = CourseMapper.arrayToDomain(result);
      // return courses;
      return CourseMapper.arrayToDomain(result);
    }
  }

  async getCourseCount(category: string, trainerId: string): Promise<number> {
    let result = await this.find({
      relations: {
        category: true,
        trainer: true
      }
    })
    if (result.length == 0) {return 0}   //{return Result.fail(new Error('No se encontraron Cursos'), HttpStatus.BAD_REQUEST, `No se encontraron Cursos`)}
    const courses = CourseMapper.arrayToDomain(result);
    
    courses.filter((course) => course.Category.equals(new CourseCategory(category)))
    courses.filter((course) => course.Trainer.equals(new CourseTrainer(trainerId)))
    
    return courses.length;
  }
}