import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, TService } from "src/common/application/interfaces/IService";

export class GetCourseByIdService implements IService<TGetCourseById, Promise<Course>> {
  constructor(private readonly courseRepository: ICourseRepository){}

  execute(service: TGetCourseById): Promise<Course> {
    return this.courseRepository.getCourseById(service.courseId);
  }
}

export class TGetCourseById implements TService {
  constructor(readonly courseId: string) {}

  toString(): string {
    return "GetCourseById";
  }
}