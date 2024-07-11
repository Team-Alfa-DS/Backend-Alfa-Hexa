import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";

export class GetCourseCountService extends IService<GetCourseCountRequest, GetCourseCountResponse> {
  constructor(private courseRepository: ICourseQueryRepository) {super()}
  
  async execute(request: GetCourseCountRequest): Promise<Result<GetCourseCountResponse>> {
      let courseCategory: CourseCategory; let courseTrainer: CourseTrainer;
      if (request.category) {courseCategory = new CourseCategory(request.category)}
      if (request.trainer) {courseTrainer = new CourseTrainer(request.trainer)}
      const count = await this.courseRepository.getCourseCount(courseCategory, courseTrainer);

      return Result.success(new GetCourseCountResponse(count));
    
  }
}

export class GetCourseCountRequest implements ServiceRequestDto {
  constructor(
    readonly category?: string,
    readonly trainer?: string
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