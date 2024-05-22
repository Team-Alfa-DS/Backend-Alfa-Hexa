import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, TService } from "src/common/application/interfaces/IService";

export class GetAllCoursesService implements IService<TGetAllCourses, Promise<Course[]>> {
  constructor(private readonly courseRepository: ICourseRepository){}

  execute(service: TGetAllCourses): Promise<Course[]> {
    return this.courseRepository.getAllCourses();
  }
}

export class TGetAllCourses implements TService {
  toString(): string {
    return "GetAllCourses";
  }
}