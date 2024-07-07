import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ICourseRepository } from "../../domain/repositories/ICourse.repository";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";

export class GetCourseCountService extends IService<GetCourseCountRequest, GetCourseCountResponse> {
  constructor(private courseRepository: ICourseRepository) {super()}
  
  async execute(request: GetCourseCountRequest): Promise<Result<GetCourseCountResponse>> {
    try {
      let courseCategory: CourseCategory; let courseTrainer: CourseTrainer;
      if (request.category) {courseCategory = new CourseCategory(request.category)}
      if (request.trainer) {courseTrainer = new CourseTrainer(request.trainer)}
      const count = await this.courseRepository.getCourseCount(courseCategory, courseTrainer);

      return Result.success(new GetCourseCountResponse(count));
    
    } catch (error) {
      return Result.fail(error);
    }
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