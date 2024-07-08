import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../../domain/repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { Category } from "src/category/domain/Category";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";

export class GetManyCoursesService extends IService<GetManyCoursesRequest, GetManyCoursesResponse> {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly trainerRepository: ITrainerRepository,
    private readonly categoryRepository: ICategoryRepository,
  ){super()}

  async execute(request: GetManyCoursesRequest): Promise<Result<GetManyCoursesResponse>> {
    try {
      let courseTag: CourseTag; let courseCategory: CourseCategory; let courseTrainer: CourseTrainer;
      if (request.filter) {courseTag = new CourseTag(request.filter)}
      if (request.category) {courseCategory = new CourseCategory(request.category)}
      if (request.trainer) {courseTrainer = new CourseTrainer(request.trainer)}
      // console.log(request);//Debug
      
      let r = await this.courseRepository.getManyCourses(
        [courseTag],
        courseCategory,
        courseTrainer
      );
      
      let page = 0;
      if (request.perpage) { 
        if (request.page) {page = request.page};

        r = r.slice((page*request.perpage), ((request.perpage) + page*request.perpage));
      }

      const responseCourses: {
        id: string;
        title: string;
        image: string;
        date: Date;
        category: string;
        trainer: string;
      }[] = []
      let trainer: Result<Trainer>;
      let category: Result<Category>;
      for (let course of r) {
        trainer = await this.trainerRepository.findTrainerById(course.Trainer.value);
        if (!trainer.isSuccess) {return Result.fail(trainer.Error)} //TODO: Esto se va cuando se aplique el manejo de excepciones de dominio
        category = await this.categoryRepository.getCategoryById(course.Category.value);
        if (!category.isSuccess) {return Result.fail(category.Error)}

        responseCourses.push({
          id: course.Id.Value,
          title: course.Title.value,
          image: course.Image.Value,
          date: course.Date,
          category: category.Value.Name.value,
          trainer: trainer.Value.Name.trainerName
        })
      }

      return Result.success(new GetManyCoursesResponse(responseCourses));
      // if (r.isSuccess) {
        
      //   return Result.success(new GetManyCoursesResponse(responseCourses));
      // } else {
      //   return Result.fail(r.Error);
      // }
    } catch (error) {
      return Result.fail(error);
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