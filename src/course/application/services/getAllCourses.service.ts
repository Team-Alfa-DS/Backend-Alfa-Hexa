import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class GetAllCoursesService implements IService<GetManyCoursesRequest, GetManyCoursesResponse> {
  constructor(private readonly courseRepository: ICourseRepository){}

  async execute(service: GetManyCoursesRequest): Promise<GetManyCoursesResponse> {
    const r = await this.courseRepository.getAllCourses();
    return new GetManyCoursesResponse(r);
  }
}

export class GetManyCoursesRequest implements ServiceRequestDto {
  //query here when i have it

  dataToString(): string {
    return ""
  }
}

export class GetManyCoursesResponse implements ServiceResponseDto {
  constructor(readonly courses: Course[]) {}

  dataToString(): string {
    return this.courses.toString();
  }
}