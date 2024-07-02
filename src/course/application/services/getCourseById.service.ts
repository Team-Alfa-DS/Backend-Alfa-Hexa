import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { Category } from "src/category/domain/Category";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { DomainException } from "src/common/domain/domain-exception";
import { CourseNotFoundException } from "src/course/domain/exceptions/courseNotFound";

export class GetCourseByIdService extends IService<GetCourseByIdRequest, GetCourseByIdResponse> {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly trainerRepository: ITrainerRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {super();}

  async execute(service: GetCourseByIdRequest): Promise<Result<GetCourseByIdResponse>> {
    try {
      const r = await this.courseRepository.getCourseById(service.courseId);

      const trainer: Result<Trainer> = await this.trainerRepository.findTrainerById(r.Value.Trainer.value);
        if (!trainer.isSuccess) {return Result.fail(trainer.Error, trainer.StatusCode, trainer.Message)} //TODO: Estos se van cuando estén las excepciones bien implementadas
        const category: Result<Category> = await this.categoryRepository.getCategoryById(r.Value.Category.value);
        if (!category.isSuccess) {return Result.fail(category.Error, category.StatusCode, category.Message)}

        const lessons: {
          id: string,
          title: string,
          content: string,
          video: string
        }[] = [];
        for (let lesson of r.Value.Lessons) {
          lessons.push({
            id: lesson.id.Value,
            title: lesson.title.value,
            content: lesson.content.value,
            video: lesson.video.Value
          });
        }

        return Result.success(new GetCourseByIdResponse(
          r.Value.Id.Value,
          r.Value.Title.value,
          r.Value.Description.value,
          category.Value.Name.value,
          r.Value.Image.Value,
          {id: trainer.Value.Id.trainerId, name: trainer.Value.Name.trainerName},
          r.Value.Level.value,
          r.Value.DurationWeeks.value,
          r.Value.DurationMinutes.value,
          r.Value.Tags.map(tag => tag.name),
          r.Value.Date,
          lessons
        ), 200);
    } catch (error) {
      return Result.fail(error, 400, `yes`);
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