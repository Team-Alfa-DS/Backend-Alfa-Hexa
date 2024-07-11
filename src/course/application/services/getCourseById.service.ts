import { Course } from "src/course/domain/Course";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";
import { Category } from "src/category/domain/Category";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { IOdmTrainerRepository } from "src/trainer/domain/repositories/odm-trainer-repository.interface";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";

export class GetCourseByIdService extends IService<GetCourseByIdRequest, GetCourseByIdResponse> {
  constructor(
    private readonly courseRepository: ICourseQueryRepository,
    private readonly trainerRepository: IOdmTrainerRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {super();}

  async execute(request: GetCourseByIdRequest): Promise<Result<GetCourseByIdResponse>> {
    try {
      const r = await this.courseRepository.getCourseById(new CourseId(request.courseId));

      const trainer: Result<Trainer> = await this.trainerRepository.findTrainerById(r.Trainer.value);
      if (!trainer.isSuccess) {return Result.fail(trainer.Error)}; //TODO: Los chequeos se van cuando se termine de implementar el manejo de excepciones de dominio
      const category: Result<Category> = await this.categoryRepository.getCategoryById(r.Category.value);
      if (!category.isSuccess) {return Result.fail(category.Error)}

        const lessons: {
          id: string,
          title: string,
          content: string,
          video: string
        }[] = [];
        for (let lesson of r.Lessons) {
          lessons.push({
            id: lesson.id.Value,
            title: lesson.title.value,
            content: lesson.content.value,
            video: lesson.video.Value
          });
        }
        // let levelNum = 1;
        // switch(r.Level.value) {
        //   case('Principiante'): levelNum = 1;
        //   case('Intermedio'): levelNum = 2;
        //   case('Avanzado'): levelNum = 3;
        //   case('Todos los Niveles'): levelNum = 4;
        // }

      return Result.success(new GetCourseByIdResponse(
        r.Id.Value,
        r.Title.value,
        r.Description.value,
        category.Value.Name.value,
        r.Image.Value,
        {id: trainer.Value.Id.trainerId, name: trainer.Value.Name.trainerName},
        r.Level.value,
        r.DurationWeeks.value,
        r.DurationMinutes.value,
        r.Tags.map(tag => tag.name),
        r.Date.value,
        lessons
      ));
    } catch (error) {
      return Result.fail(error);
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
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly trainer: {id: string, name: string};
  readonly level: string;
  readonly durationWeeks: number;
  readonly durationMinutes: number;
  readonly tags: string[] = [];
  readonly date: Date;
  readonly lessons: {
    id: string,
    title: string,
    content: string,
    video: string
  }[] = [];
  
  constructor(
    id: string,
    title: string,
    description: string,
    category: string,
    image: string,
    trainer: {id: string, name: string},
    level: string,
    durationWeeks: number,
    durationMinutes: number,
    tags: string[],
    date: Date,
    lessons: {id: string, title: string, content: string, video: string}[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category; //.value;
    this.image = image;
    this.trainer = {id: trainer.id, name: trainer.name};
    this.level = level;
    this.durationWeeks = durationWeeks;
    this.durationMinutes = durationMinutes;
    this.tags = tags;
    this.date = date; //.value;
    this.lessons = lessons;
  }

  dataToString(): string {
    return `GetCourseByIdResponse: ${JSON.stringify(this)}`;
  }
}