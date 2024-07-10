import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { TypeFile } from "src/common/application/file-uploader/enums/type-file.enum";
import { IFileUploader } from "src/common/application/file-uploader/file-uploader.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { Lesson } from "src/course/domain/entities/Lesson";
import { ICourseCommandRepository } from "src/course/domain/repositories/ICourseCommand.repository";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { LessonContent } from "src/course/domain/value-objects/lesson-content";
import { LessonDuration } from "src/course/domain/value-objects/lesson-duration";
import { LessonId } from "src/course/domain/value-objects/lesson-id";
import { LessonTitle } from "src/course/domain/value-objects/lesson-title";
import { LessonVideo } from "src/course/domain/value-objects/lesson-video";

export class PostLessonService implements IService<PostLessonRequestDto, PostLessonResponseDto> {
  constructor(
    private courseCommandRepository: ICourseCommandRepository,
    private courseQueryRepository: ICourseQueryRepository,
    private idGen: IIdGen,
    // private transactionHandler: ITransactionHandler,
    private eventPublisher: IEventPublisher,
    private fileUploader: IFileUploader,
  ) {}

  async execute(request: PostLessonRequestDto): Promise<Result<PostLessonResponseDto>> {
      const generatedId = await this.idGen.genId();
      
      const courseToPostIn = await this.courseQueryRepository.getCourseById(new CourseId(request.courseId));
      const video = await this.fileUploader.uploadFile(request.video, TypeFile.video);
      if (!video.isSuccess) return Result.fail(video.Error)
      courseToPostIn.postLesson(
        new LessonId(generatedId),
        new LessonTitle(request.title),
        new LessonContent(request.content),
        new LessonDuration(request.seconds),
        new LessonVideo(video.Value)
      );

      const lesson = courseToPostIn.getLesson(new LessonId(generatedId));

      await this.courseCommandRepository.saveLesson(lesson, courseToPostIn);

      this.eventPublisher.publish(courseToPostIn.pullDomainEvents());

      return Result.success(new PostLessonResponseDto(generatedId));
  }

  get name(): string {
    return this.constructor.name;
  }
}

export class PostLessonRequestDto implements ServiceRequestDto {
  constructor(
    readonly courseId: string,
    readonly title: string,
    readonly content: string,
    readonly seconds: number,
    readonly video: Express.Multer.File
  ) {}
  
  dataToString(): string {
    return `PostLessonRequest: ${JSON.stringify(this)}`
  }

}

export class PostLessonResponseDto implements ServiceResponseDto {
  constructor(
    readonly lessonId: string
  ) {}
  
  dataToString(): string {
    return `PostLessonResponse: ${JSON.stringify(this)}`
  }

}