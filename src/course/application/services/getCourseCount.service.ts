import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ICourseRepository } from "../../domain/repositories/ICourse.repository";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";

export class GetCourseCountService extends IService<GetCourseCountRequest, GetCourseCountResponse> {
  constructor(private courseRepository: ICourseRepository) {super()}
  
  async execute(service: GetCourseCountRequest): Promise<Result<GetCourseCountResponse>> {
    try {
      const count = await this.courseRepository.getCourseCount(new CourseCategory(service.category), new CourseTrainer(service.trainer));

      return Result.success(new GetCourseCountResponse(count));
    
    } catch (error) {
      return Result.fail(error);
    }
  }

}

export class GetCourseCountRequest implements ServiceRequestDto {
  constructor(
    readonly category: string,
    readonly trainer: string
  ) {}

  dataToString(): string {
    return `GetCourseCountRequest: ${JSON.stringify(this)}`
  }

}

export class GetCourseCountResponse implements ServiceResponseDto {
  constructor(readonly count: number) {}
  
  dataToString(): string {
    return `GetCourseCountResponse: { count: ${this.count}}`
  }
  
}