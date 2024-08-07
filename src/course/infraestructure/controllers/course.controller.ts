/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Inject, Param, UseGuards, Query, HttpException, ParseUUIDPipe, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetManyCoursesService, GetManyCoursesRequest, GetManyCoursesResponse } from "src/course/application/services/getManyCourses.service";
import { GetCourseByIdService, GetCourseByIdRequest, GetCourseByIdResponse } from "src/course/application/services/getCourseById.service";
import { TOrmCourseRepository } from "../repositories/TOrmCourse.repository";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
import { IService } from "src/common/application/interfaces/IService";
import { GetManyCoursesQueryDto } from "../dtos/getManyCoursesQuery.dto";
import { LoggerDecorator } from "src/common/application/aspects/loggerDecorator";
import { NestLogger } from "src/common/infraestructure/logger/nest-logger";
import { ServiceDBLoggerDecorator } from "src/common/application/aspects/serviceDBLoggerDecorator";
import { OrmAuditRepository } from "src/common/infraestructure/repository/orm-audit.repository";
import { OrmCourseEntity } from "../entities/orm-entities/orm-course.entity";
import { GetCourseCountQueryDto } from "../dtos/getCourseCountQuery.dto";
import { GetCourseCountRequest, GetCourseCountResponse, GetCourseCountService } from "src/course/application/services/getCourseCount.service";
import { OrmTrainerRepository } from "src/trainer/infraestructure/repositories/orm-trainer.repositorie";
import { OrmTrainerMapper } from "src/trainer/infraestructure/mapper/orm-trainer.mapper";
import { OrmCategoryRepository } from "src/category/infraestructure/repositories/orm-category.repository";
import { OrmCategoryMapper } from "src/category/infraestructure/mapper/orm-category.mapper";
import { ExceptionMapper } from "src/common/infraestructure/mappers/exception-mapper";
import { OdmCourseRepository } from "../repositories/OdmCourse.repository";
import { InjectModel } from "@nestjs/mongoose";
import { OdmCourseEntity } from "../entities/odm-entities/odm-course.entity";
import { Model } from "mongoose";
import { PostCourseBodyDto } from "../dtos/postCourseBodyDto.dto";
import { PostCourseRequestDto, PostCourseResponseDto, PostCourseService } from "src/course/application/services/postCourse.service";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { UuidGen } from "src/common/infraestructure/id-gen/uuid-gen";
import { EventManagerSingleton } from "src/common/infraestructure/events/event-manager/event-manager-singleton";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { SaveCourseEvent } from "../events/synchronize/save-course.event";
import { PostLesonBodyDto } from "../dtos/postLessonBody.dto";
import { OdmLessonEntity } from "../entities/odm-entities/odm-lesson.entity";
import { PostLessonRequestDto, PostLessonResponseDto, PostLessonService } from "src/course/application/services/postLesson.service";
import { PostLessonEvent } from "../events/synchronize/post-lesson.event";
import { OdmLessonCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.lesson.entity";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { ExceptionDecorator } from "src/common/application/aspects/exceptionDecorator";
import { OdmTrainerRepository } from "src/trainer/infraestructure/repositories/odm-trainer.repository";
import { OdmTrainerMapper } from "src/trainer/infraestructure/mapper/odm-trainer.mapper";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";
import { OdmCategoryRepository } from "src/category/infraestructure/repositories/odm-category.repository";
import { OdmCategoryMapper } from "src/category/infraestructure/mapper/odm-mapperCategory";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateCourseDto } from "../dtos/createCourse.dto";
import { IFileUploader } from "src/common/application/file-uploader/file-uploader.interface";
import { CloudinaryService } from "src/common/infraestructure/file-uploader/cloudinary-uploader";

@ApiTags('Course')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('course')
export class CourseController {
  private readonly getManyCoursesService: IService<GetManyCoursesRequest, GetManyCoursesResponse>;
  private readonly getCourseByIdService: IService<GetCourseByIdRequest, GetCourseByIdResponse>;
  private readonly getCourseCountService: IService<GetCourseCountRequest, GetCourseCountResponse>;
  private readonly postCourseService: IService<PostCourseRequestDto, PostCourseResponseDto>;
  private readonly postLessonService: IService<PostLessonRequestDto, PostLessonResponseDto>;

  private eventPublisher: IEventPublisher = EventManagerSingleton.getInstance();

  constructor(@InjectModel('course') courseModel: Model<OdmCourseEntity>, 
              @InjectModel('category') categoryModel: Model<OdmCategoryEntity>,
              @InjectModel('trainer') trainerModel: Model<OdmTrainerEntity>,
              @InjectModel('tag') tagModel: Model<OdmTagEntity>,
              @InjectModel('lesson') lessonModel: Model<OdmLessonEntity>,
              @InjectModel('lesson_comment') commentModel: Model<OdmLessonCommentEntity>,
              @InjectModel('user') userModel: Model<OdmUserEntity>,
              @InjectModel('blog') blogModel: Model<OdmBlogEntity>
  ) {
    const OrmCourseRepositoryInstance = new TOrmCourseRepository(PgDatabaseSingleton.getInstance());
    const OdmCourseRepositoryInstance = new OdmCourseRepository(courseModel, categoryModel, trainerModel, tagModel, lessonModel, commentModel, userModel);
    // const trainerRepositoryInstance = new OrmTrainerRepository(new OrmTrainerMapper() ,PgDatabaseSingleton.getInstance());
    // const categoryRepositoryInstance = new OrmCategoryRepository(new OrmCategoryMapper(), PgDatabaseSingleton.getInstance());
    const trainerRepositoryInstance = new OdmTrainerRepository(trainerModel, new OdmTrainerMapper(courseModel, blogModel, userModel));
    const categoryRepositoryInstance = new OdmCategoryRepository(categoryModel, new OdmCategoryMapper());
    const logger = new NestLogger();
    const fileUploader: IFileUploader = new CloudinaryService();
    
    this.eventPublisher.subscribe('CourseRegistered', [new SaveCourseEvent(OdmCourseRepositoryInstance)]);
    this.eventPublisher.subscribe('LessonPosted', [new PostLessonEvent(OdmCourseRepositoryInstance)]);
  

    this.getManyCoursesService = new ExceptionDecorator(
      new LoggerDecorator( 
        new GetManyCoursesService(OdmCourseRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance), 
        logger
      )
    );
    this.getCourseByIdService = new ExceptionDecorator(
      new LoggerDecorator(
        new GetCourseByIdService(OdmCourseRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance), 
        logger
      )
    );
    this.getCourseCountService = new ExceptionDecorator(
      new LoggerDecorator(
        new GetCourseCountService(OdmCourseRepositoryInstance),
        logger
      )
    );
    this.postCourseService = new ExceptionDecorator(
      new LoggerDecorator(
        new ServiceDBLoggerDecorator(
          new PostCourseService(
            OrmCourseRepositoryInstance,
            OdmCourseRepositoryInstance, 
            new UuidGen(),
            // new TransactionHandler(PgDatabaseSingleton.getInstance().createQueryRunner()),
            EventManagerSingleton.getInstance(),
            fileUploader
          ),
          new OrmAuditRepository(PgDatabaseSingleton.getInstance()),
        ),
        logger
      )
    );
    this.postLessonService = new ExceptionDecorator(
      new LoggerDecorator(
        new ServiceDBLoggerDecorator(
          new PostLessonService(
            OrmCourseRepositoryInstance,
            OdmCourseRepositoryInstance,
            new UuidGen(),
            EventManagerSingleton.getInstance(),
            fileUploader
          ),
          new OrmAuditRepository(PgDatabaseSingleton.getInstance()),
        ),
        logger
      )
    )
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/:id')
  @ApiCreatedResponse({
    description: 'se encontro el curso correctamente',
    type: OrmCourseEntity,
  })
  @ApiBadRequestResponse({
    description: 'No se encontro el curso. Intente con otra Id'
  })
  async getCourseById(@Param('id', ParseUUIDPipe) courseId: string) {
    const request = new GetCourseByIdRequest(courseId);
    const result = await this.getCourseByIdService.execute(request);
    return result.Value;
  }

  @UseGuards(JwtAuthGuard)
  @Get("many")
  @ApiQuery({name: 'filter', required:false})
  @ApiQuery({name: 'category', required:false})
  @ApiQuery({name: 'trainer', required:false})
  @ApiCreatedResponse({
    description: 'se retorno la totalidad de cursos',
    type: OrmCourseEntity,
  })
  @ApiBadRequestResponse({
    description: 'No se encontraron cursos.'
  })
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  async getManyCourses(@Query() manyCoursesQueryDto: GetManyCoursesQueryDto) {
    const request = new GetManyCoursesRequest(
      manyCoursesQueryDto.filter,
      manyCoursesQueryDto.category,
      manyCoursesQueryDto.trainer,
      manyCoursesQueryDto.page,
      manyCoursesQueryDto.perPage);

    const result = await this.getManyCoursesService.execute(request);
    return result.Value.courses;
  }

  @Get('/count')
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  async getCourseCount(@Query() courseCountQueryDto: GetCourseCountQueryDto) {
    const request = new GetCourseCountRequest(
      courseCountQueryDto.category,
      courseCountQueryDto.trainer
    )

    const result = await this.getCourseCountService.execute(request);
    return result.Value;
  }

  @Post('create/course')
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  @UseInterceptors(FileInterceptor('image'))
  async postCourse(@UploadedFile(
    new ParseFilePipe({
      validators: [new FileTypeValidator({fileType: /(jpg|jpeg|png|webp)$/})]
    }),
  ) image: Express.Multer.File, @Body() postCourseBodyDto: PostCourseBodyDto) {
    const response = await this.postCourseService.execute(new PostCourseRequestDto(
      postCourseBodyDto.title,
      postCourseBodyDto.description,
      image,
      postCourseBodyDto.durationWeeks,
      postCourseBodyDto.level,
      postCourseBodyDto.tags,
      postCourseBodyDto.categoryId,
      postCourseBodyDto.trainerId
    ));

    return response.Value;
  }

  @Post('create/lesson')
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  @UseInterceptors(FileInterceptor('video'))
  async postLesson(@UploadedFile(
    new ParseFilePipe({
      validators: [new FileTypeValidator({fileType: /(mp4)$/})]
    }),
  ) video: Express.Multer.File, @Body() postLessonBodyDto: PostLesonBodyDto) {
    const response = await this.postLessonService.execute(new PostLessonRequestDto(
      postLessonBodyDto.courseId,
      postLessonBodyDto.title,
      postLessonBodyDto.content,
      postLessonBodyDto.seconds,
      video
    ));
    return response.Value;
  }
}