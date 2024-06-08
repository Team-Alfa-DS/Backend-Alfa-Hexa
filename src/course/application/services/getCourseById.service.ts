import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";

export class GetCourseByIdService implements IService<GetCourseByIdRequest, GetCourseByIdResponse> {
  constructor(private readonly courseRepository: ICourseRepository){}

  async execute(service: GetCourseByIdRequest): Promise<Result<GetCourseByIdResponse>> {
    const r = await this.courseRepository.getCourseById(service.courseId);

    if (r.isSuccess) {
      return Result.success(new GetCourseByIdResponse(r.Value), r.StatusCode);
    } else {
      return Result.fail(r.Error, r.StatusCode, r.Message);
    }
    
  }
}

export class GetCourseByIdRequest implements ServiceRequestDto{
  constructor(readonly courseId: string) {}

  dataToString(): string {
    return `GetCourseByIdRequest: {id: ${this.courseId} }`; 
  }
}

export class GetCourseByIdResponse implements ServiceResponseDto {
  constructor(readonly course: Course) {};

  dataToString(): string {
    return `GetCourseByIdResponse: ${JSON.stringify(this.course)}`;
  }
}