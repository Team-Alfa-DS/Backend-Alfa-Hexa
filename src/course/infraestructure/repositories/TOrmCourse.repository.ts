import { ICourseRepository } from "src/course/domain/repositories/ICourse.repository";
import { Course } from "src/course/domain/Course";
import { DataSource, Repository } from "typeorm";
import { OrmCourseEntity } from "../entities/orm-entities/orm-course.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { OrmCourseMapper } from "../mappers/orm-mappers/orm-course.mapper";
import { Result } from "src/common/domain/result-handler/result";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { CourseNotFoundException } from "src/course/domain/exceptions/courseNotFound";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { TransactionHandler } from "src/common/infraestructure/database/transaction-handler";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
import { OrmLessonMapper } from "../mappers/orm-mappers/orm-lesson.mapper";
import { Lesson } from "src/course/domain/entities/Lesson";

export class TOrmCourseRepository extends Repository<OrmCourseEntity> implements ICourseRepository {
  constructor(database: DataSource){
    super(OrmCourseEntity, database.manager)
  }

  async getManyCourses(filter?: CourseTag[], category?: CourseCategory, trainer?: CourseTrainer): Promise<Course[]> {
    let result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true,
      }
    });
    if (result.length <= 0) { throw new CourseNotFoundException(`No hay cursos guardados`)}
    

    let courses = OrmCourseMapper.arrayToDomain(result);
    
    if (filter) {
      for (let tag of filter) {
        if (tag) {
          courses = courses.filter((course) => course.containsTag(tag)); //Tags.includes(new CourseTag(tag))
        } 
      }
      // courses = courses.filter((course) => course.tags.includes(filter))
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

  async getCourseById(courseId: CourseId): Promise<Course> /*Promise<Result<Course>>*/ {
    const result = await this.findOne({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true
      }, 
      where: {
        id: courseId.Value
      }
    });

    if (!result) {throw new CourseNotFoundException(`No se encontró un curso con el id: ${courseId}`)}

    return OrmCourseMapper.toDomain(result);

    // if (result) {
    //   const course = CourseMapper.toDomain(result);
    //   return Result.success(course);
    // } else {
    //   return Result.fail(new Error(`No se encontró el Curso con el id: ${courseId}`));
    // }
  }


  async getCoursesByTag(tag: CourseTag): Promise<Course[]> {
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

    let courses = OrmCourseMapper.arrayToDomain(result);
    courses = courses.filter((course) => course.containsTag(tag));
    
    if (courses.length <= 0) {
      throw new CourseNotFoundException(`No se encontraron cursos con el tag: ${tag}`);
    } 
    return courses;
  }

  async getCourseByLessonId(lessonId: LessonId): Promise<Course> {
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
        if (lessonId.equals(new LessonId(lesson.id))) {
          return OrmCourseMapper.toDomain(course);
        }
      }
    }
    throw new CourseNotFoundException(`No se encontró un curso que contenga la lección con id: ${lessonId}`);
  }

  async getAllCourses(): Promise<Course[]> {
    let result = await this.find({
      relations: {
        category: true,
        lessons: true,
        trainer: true,
        tags: true,
      }
    });

    // if (result.length <= 0) {
    //   // throw new CourseNotFoundException(`No hay cursos guardados`);
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
      return OrmCourseMapper.arrayToDomain(result);
    }
  }

  async getCourseCount(category?: CourseCategory, trainerId?: CourseTrainer): Promise<number> {
    const result = await this.find({
      relations: {
        category: true,
        trainer: true
      }
    });
    if (result.length == 0) {return 0}   //{return Result.fail(new Error('No se encontraron Cursos'), HttpStatus.BAD_REQUEST, `No se encontraron Cursos`)}
    let courses = OrmCourseMapper.arrayToDomain(result);
    
    if (category) {courses = courses.filter((course) => course.Category.equals(category))}
    if (trainerId) {courses = courses.filter((course) => course.Trainer.equals(trainerId))}
    
    return courses.length;
  }

  async saveCourse(course: Course): Promise<Course> {
    const runnerTransaction = PgDatabaseSingleton.getInstance().createQueryRunner();
    const ormCourseEntity = OrmCourseMapper.toPersistence(course);
    await runnerTransaction.manager.save(ormCourseEntity);
    return course;
  }

  async saveLesson(lesson: Lesson, course: Course): Promise<Lesson> {
    const runnerTransaction = PgDatabaseSingleton.getInstance().createQueryRunner();
    const ormLessonEntity = OrmLessonMapper.toPersistence(lesson, course);
    await runnerTransaction.manager.save(ormLessonEntity);
    return lesson;
  }
}