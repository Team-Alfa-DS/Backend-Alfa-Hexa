import { Course } from "src/course/domain/aggregates/Course";
import { ICourseRepository } from "../repositories/ICourse.repository";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";

export class GetCourseByIdService extends IService<GetCourseByIdRequest, GetCourseByIdResponse> {
  constructor(private readonly courseRepository: ICourseRepository) {super();}

  async execute(service: GetCourseByIdRequest): Promise<Result<GetCourseByIdResponse>> {
    const r = await this.courseRepository.getCourseById(service.courseId);

    if (r.isSuccess) {
      return Result.success(new GetCourseByIdResponse(r.Value), r.StatusCode);
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
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly trainer: {id: string, name: string};
  readonly level: string;
  readonly durationWeeks: number;
  readonly durationMinutes: number;
  readonly tags: string[];
  readonly date: Date;
  readonly lessons: {
    id: string,
    title: string,
    content: string,
    video?: string,
    image?: string
  }[] = [];
  
  constructor(course: Course) {
    this.title = course.Title.value;
    this.description = course.Description.value;
    this.category = course.Category //.value;
    this.image = course.Image.url;
    this.trainer = course.Trainer //.value;
    this.level = course.Level.value;
    this.durationWeeks = course.DurationWeeks.value;
    this.durationMinutes = course.DurationMinutes.value;
    this.tags = course.Tags //.value;

    for (let lesson of course.Lessons) {
      let videoUrl: string, imageUrl: string;
      if (lesson.video) {videoUrl = lesson.video.url;}
      if (lesson.image) {imageUrl = lesson.image.url;}
      this.lessons.push({
        id: lesson.id.value,
        title: lesson.title.value,
        content: lesson.content.value,
        video: videoUrl,
        image: imageUrl
      })
    }
  };

  dataToString(): string {
    return `GetCourseByIdResponse: ${JSON.stringify(this)}`;
  }
}