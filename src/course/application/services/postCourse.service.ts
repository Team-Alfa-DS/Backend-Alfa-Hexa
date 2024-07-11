import { ICategoryCommandRepository } from "src/category/domain/repositories/category-repository.interface";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { TypeFile } from "src/common/application/file-uploader/enums/type-file.enum";
import { IFileUploader } from "src/common/application/file-uploader/file-uploader.interface";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { IService, ServiceRequestDto, ServiceResponseDto } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { Course } from "src/course/domain/Course";
import { CourseAlreadyExistException } from "src/course/domain/exceptions/course-already-exist.exception";
import { ICourseCommandRepository } from "src/course/domain/repositories/ICourseCommand.repository";
import { ICourseQueryRepository } from "src/course/domain/repositories/ICourseQuery.repository";
import { CourseCategory } from "src/course/domain/value-objects/course-category";
import { CourseDate } from "src/course/domain/value-objects/course-date";
import { CourseDescription } from "src/course/domain/value-objects/course-description";
import { CourseDurationMinutes } from "src/course/domain/value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "src/course/domain/value-objects/course-durationWeeks";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { CourseImage } from "src/course/domain/value-objects/course-image";
import { CourseLevel } from "src/course/domain/value-objects/course-level";
import { CourseTag } from "src/course/domain/value-objects/course-tag";
import { CourseTitle } from "src/course/domain/value-objects/course-title";
import { CourseTrainer } from "src/course/domain/value-objects/course-trainer";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";

export class PostCourseService implements IService<PostCourseRequestDto, PostCourseResponseDto> {
  constructor(
    private courseRepository: ICourseCommandRepository,
    private odmCourseRepository: ICourseQueryRepository,
    private idGen: IIdGen,
    private eventPublisher: IEventPublisher,
    private fileUploader: IFileUploader
  ) {}
  
  async execute(request: PostCourseRequestDto): Promise<Result<PostCourseResponseDto>> {
      try {
        const course = await this.odmCourseRepository.getCourseByTitle(new CourseTitle(request.title));
        // if (course) throw new CourseAlreadyExistException(`El curso ${request.title} ya existe`);
        if (course) {return Result.fail(new CourseAlreadyExistException(`El curso ${request.title} ya existe`))}
        const generatedId = await this.idGen.genId();

        const image = await this.fileUploader.uploadFile(request.image, TypeFile.image);
        if (!image.isSuccess) return Result.fail(image.Error);

        const domainTags: CourseTag[] = []
        for (let tag of request.tags) {
          domainTags.push(new CourseTag(tag));
        }

      const domainCourse = Course.create(
        new CourseId(generatedId),
        new CourseTitle(request.title),
        new CourseDescription(request.description),
        new CourseImage(image.Value),
        new CourseDate(new Date()),
        new CourseDurationMinutes(0),
        new CourseDurationWeeks(request.durationWeeks),
        new CourseLevel(request.level),
        [],
        domainTags,
        new CourseCategory(request.categoryId),
        new CourseTrainer(request.trainerId)
      );

        const createdCourse = await this.courseRepository.saveCourse(
          domainCourse
        );

        domainCourse.register(domainCourse.Id, domainCourse.Title, domainCourse.Description, domainCourse.Image, domainCourse.Date, domainCourse.DurationMinutes, domainCourse.DurationWeeks, domainCourse.Level, domainCourse.Lessons, domainCourse.Tags, domainCourse.Category, domainCourse.Trainer);
        this.eventPublisher.publish(domainCourse.pullDomainEvents());

        return Result.success(new PostCourseResponseDto(generatedId));
      } catch (error) {
        return Result.fail(error);
      }
  }
  
  get name(): string {
    return this.constructor.name;
  }
}

export class PostCourseRequestDto implements ServiceRequestDto {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly image: Express.Multer.File,
    // readonly date: Date,
    readonly durationWeeks: number,
    readonly level: string,
    readonly tags: string[],
    readonly categoryId: string,
    readonly trainerId: string,
  ) {}


  dataToString(): string {
    return `PostCourseRequest: ${JSON.stringify(this)}`
  }
}

export class PostCourseResponseDto implements ServiceResponseDto {
  constructor(
    readonly courseId: string
  ) {}

  dataToString(): string {
    return `PostCourseResponse: ${JSON.stringify(this)}`
  }

}