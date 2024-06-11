import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";

export class GetManyCoursesService extends IService<GetManyCoursesRequest, GetManyCoursesResponse> {
  constructor(private readonly courseRepository: ICourseRepository){super()}

  async execute(request: GetManyCoursesRequest): Promise<Result<GetManyCoursesResponse>> {
    const r = await this.courseRepository.getManyCourses(
      [request.filter],
      request.category,
      request.trainer,
      request.page,
      request.perpage
    ); 
    if (r.isSuccess) {
      return Result.success(new GetManyCoursesResponse(r.Value), r.StatusCode);
    } else {
      return Result.fail(r.Error, r.StatusCode, r.Message);
    }
    
  }
}

export class GetManyCoursesRequest implements ServiceRequestDto {
  readonly filter?: string
  readonly category?: string
  readonly trainer?: string
  readonly page?: number
  readonly perpage?: number

  constructor(
    filter?: string,
    category?: string,
    trainer?: string,
    page?: number,
    perpage?: number
  ){
    this.filter = filter;
    this.category = category;
    this.trainer = trainer;

    //Si va a haber paginación, van a tener que cumplirse un par de reglas o si no esto explota
    if (perpage) { //No puede haber paginación sin especificar la cantidad por página
      if (!page) {page = 0;} //Dame la página que quieres o asumo que es la primera

      this.page = page;
      this.perpage = perpage;
    }
  }

  dataToString(): string {
    return `Query: { filter: ${this.filter} | category: ${this.category} | trainer: ${this.trainer} | page: ${this.page} | perpage: ${this.perpage} }`;
  }
}

export class GetManyCoursesResponse implements ServiceResponseDto {
  constructor(readonly courses: Course[]) {}

  dataToString(): string {
    return `GetManyCoursesResponse: ${JSON.stringify(this.courses)}`;
  }
}