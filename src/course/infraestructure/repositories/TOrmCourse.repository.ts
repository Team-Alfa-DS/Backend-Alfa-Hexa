import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { Course } from "src/course/domain/Course";
import { DataSource, Repository } from "typeorm";
import { CourseEntity } from "../entities/course.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

export class TOrmCourseRepository extends Repository<CourseEntity> implements ICourseRepository {
  constructor(database: DataSource){
    super(CourseEntity, database.manager)
  }

  async getAllCourses(): Promise<Course[]> {
    try {
      const result = await this.find({
        relations: {
          category: true,
          lessons: true,
          trainer: true,
          tags: true,
        }
      })

      
    } catch (error) {
      throw new HttpException("No se encontraron cursos", HttpStatus.BAD_REQUEST)
    }
  }
  getCourseById(courseId: string): Promise<Course> {
    throw new Error("Method not implemented.");
  }

}