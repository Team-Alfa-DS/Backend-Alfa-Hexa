import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";

export class GetCourseByIdService extends IService<GetCourseByIdRequest, GetCourseByIdResponse> {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly trainerRepository: ITrainerRepository
  ) {super();}

  async execute(service: GetCourseByIdRequest): Promise<Result<GetCourseByIdResponse>> {
    const r = await this.courseRepository.getCourseById(service.courseId);

    if (r.isSuccess) {
      const trainer: Result<Trainer> = await this.trainerRepository.findTrainerById(TrainerId.create(r.Value.Trainer.Value));
      if (!trainer.isSuccess) {return Result.fail(trainer.Error, trainer.StatusCode, trainer.Message)};
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
      console.log(trainer.Value);
      return Result.success(new GetCourseByIdResponse(
        r.Value.Id.Value,
        r.Value.Title.value,
        r.Value.Description.value,
        r.Value.Category.name,
        r.Value.Image.Value,
        {id: trainer.Value.Id.trainerId, name: trainer.Value.Name.trainerName},
        // trainer.Value.Id,
        // trainer.Value.Name,
        r.Value.Level.value,
        r.Value.DurationWeeks.value,
        r.Value.DurationMinutes.value,
        r.Value.Tags.map(tag => tag.name),
        r.Value.Date,
        lessons
      ), r.StatusCode);
    } else {
      return Result.fail(r.Error, r.StatusCode, r.Message);
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
    // trainerId: string,
    // trainerName: string,
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
    // this.trainer.id = trainerId;
    // this.trainer.name = trainerName; //.value;
    this.level = level;
    this.durationWeeks = durationWeeks;
    this.durationMinutes = durationMinutes;
    this.tags = tags;
    this.date = date; //.value;
    this.lessons = lessons;
      
    // for (let lesson of course.Lessons) {
    //   let videoUrl: string, imageUrl: string;
    //   if (lesson.video) {videoUrl = lesson.video.url;}
    //   if (lesson.image) {imageUrl = lesson.image.url;}
    //   this.lessons.push({
    //     id: lesson.id.value,
    //     title: lesson.title.value,
    //     content: lesson.content.value,
    //     video: videoUrl,
    //     image: imageUrl
    //   })
    // }

    // for (let tag of course.Tags) {
    //   this.tags.push(tag.name);
    // }
  }

  dataToString(): string {
    return `GetCourseByIdResponse: ${JSON.stringify(this)}`;
  }
}