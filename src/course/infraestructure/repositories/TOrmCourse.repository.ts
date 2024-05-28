import { ICourseRepository } from "src/course/application/repositories/ICourse.repository";
import { Course } from "src/course/domain/Course";
import { DataSource, Repository } from "typeorm";
import { CourseEntity } from "../entities/course.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { CourseMapper } from "../mappers/course.mapper";

export class TOrmCourseRepository extends Repository<CourseEntity> implements ICourseRepository {
  constructor(database: DataSource){
    super(CourseEntity, database.manager)
  }

  async getManyCourses(filter?: string, category?: string, trainer?: string, page?: number, perpage?: number): Promise<Course[]> {
    try {
      const result = await this.find({
        relations: {
          category: true,
          lessons: true,
          trainer: true,
          tags: true,
        }
      })
      
      //!Para hacer búsquedas filtradas necesito los repositorios de las otras entidades como los trainers y las categorías 
      //if (filter) {result.filter((element) => element.tags.findIndex())}
      //if (category) {}
      
      // console.log('Debug: ', result);
      const courses = CourseMapper.arrayToDomain(result);
      // console.log(courses);
      
      return courses;
    } catch (error) {
      throw new HttpException("No se encontraron cursos", HttpStatus.BAD_REQUEST);
    }
  }

  async getCourseById(courseId: string): Promise<Course> {
    try {
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

      return CourseMapper.toDomain(result);
    } catch (error) {
      throw new HttpException("No se encontró el curso pedido", HttpStatus.BAD_REQUEST);
    }
  }

}