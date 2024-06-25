import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";

export class GetManyCoursesService extends IService<GetManyCoursesRequest, GetManyCoursesResponse> {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly trainerRepository: ITrainerRepository
  ){super()}

  async execute(request: GetManyCoursesRequest): Promise<Result<GetManyCoursesResponse>> {
    const r = await this.courseRepository.getManyCourses(
      [request.filter],
      request.category,
      request.trainer,
      request.page,
      request.perpage
    ); 
    if (r.isSuccess) {
      const responseCourses: {
        id: string;
        title: string;
        image: string;
        date: Date;
        category: string;
        trainer: string;
      }[] = []
      let trainer: Result<Trainer>;
      for (let course of r.Value) {
        trainer = await this.trainerRepository.findTrainerById(course.Trainer.id.value);
        if (!trainer.isSuccess) {return Result.fail(trainer.Error, trainer.StatusCode, trainer.Message)}
        responseCourses.push({
          id: course.Id.Value,
          title: course.Title.value,
          image: course.Image.Value,
          date: course.Date,
          category: course.Category.name,
          trainer: trainer.Value.Name
        })
      }
      return Result.success(new GetManyCoursesResponse(responseCourses), r.StatusCode);
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
  readonly courses: {
    id: string;
    title: string;
    image: string;
    date: Date;
    category: string
    trainer: string;
  }[] = []
  
  constructor(courses: {
    id: string;
    title: string;
    image: string;
    date: Date;
    category: string;
    trainer: string;
  }[] ) {
    this.courses = courses;
  }

  dataToString(): string {
    return `GetManyCoursesResponse: ${JSON.stringify(this)}`;
  }
}