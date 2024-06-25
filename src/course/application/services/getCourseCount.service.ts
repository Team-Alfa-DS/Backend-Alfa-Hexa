import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ICourseRepository } from "../repositories/ICourse.repository";

export class GetCourseCountService extends IService<GetCourseCountRequest, GetCourseCountResponse> {
  constructor(private courseRepository: ICourseRepository) {super()}
  
  async execute(service: GetCourseCountRequest): Promise<Result<GetCourseCountResponse>> {
    const count = await this.courseRepository.getCourseCount(service.category, service.trainer);

    if (count.isSuccess) {
      return Result.success(new GetCourseCountResponse(count.Value), count.StatusCode);
    } else {
      return Result.fail(count.Error, count.StatusCode, count.Message);
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