import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";

export class GetManyCoursesService implements IService<GetManyCoursesRequest, GetManyCoursesResponse> {
  constructor(private readonly courseRepository: ICourseRepository){}

  async execute(request: GetManyCoursesRequest): Promise<GetManyCoursesResponse> {
    const r = await this.courseRepository.getManyCourses(
      request.filter,
      request.category,
      request.trainer,
      request.page,
      request.perpage
    );
    return new GetManyCoursesResponse(r);
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
    return "" //TODO: Armar el dataToString para loggear el servicio
  }
}

export class GetManyCoursesResponse implements ServiceResponseDto {
  constructor(readonly courses: Course[]) {}

  dataToString(): string {
    return this.courses.toString();
  }
}