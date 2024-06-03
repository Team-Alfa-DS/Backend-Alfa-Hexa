import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class GetCourseByIdService implements IService<GetCourseByIdRequest, GetCourseByIdResponse> {
  constructor(private readonly courseRepository: ICourseRepository){}

  async execute(service: GetCourseByIdRequest): Promise<GetCourseByIdResponse> {
    const r = await this.courseRepository.getCourseById(service.courseId);
    return new GetCourseByIdResponse(r);
  }
}

export class GetCourseByIdRequest implements ServiceRequestDto{
  constructor(readonly courseId: string) {}

  dataToString(): string {
    return this.courseId; 
  }
}

export class GetCourseByIdResponse implements ServiceResponseDto {
  constructor(readonly course: Course) {};

  dataToString(): string {
    return "" + this.course;
  }
}