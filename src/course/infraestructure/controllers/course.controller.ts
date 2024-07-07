/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Inject, Param, UseGuards, Query, HttpException, ParseUUIDPipe, Post, Body } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetManyCoursesService, GetManyCoursesRequest, GetManyCoursesResponse } from "src/course/application/services/getManyCourses.service";
import { GetCourseByIdService, GetCourseByIdRequest, GetCourseByIdResponse } from "src/course/application/services/getCourseById.service";
import { TOrmCourseRepository } from "../repositories/TOrmCourse.repository";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
import { ServiceLoggerDecorator } from "src/common/application/aspects/serviceLoggerDecorator";
import { FsPromiseLogger } from "src/common/infraestructure/adapters/FsPromiseLogger";
import { IService } from "src/common/application/interfaces/IService";
import { Course } from "src/course/domain/Course";
import { GetManyCoursesQueryDto } from "../dtos/getManyCoursesQuery.dto";
import { ExceptionLoggerDecorator } from "src/common/application/aspects/exceptionLoggerDecorator";
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

@ApiTags('Course')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('course')
export class CourseController {
  private readonly getManyCoursesService: IService<GetManyCoursesRequest, GetManyCoursesResponse>;
  private readonly getCourseByIdService: IService<GetCourseByIdRequest, GetCourseByIdResponse>;
  private readonly getCourseCountService: IService<GetCourseCountRequest, GetCourseCountResponse>;
  private readonly postCourseService: IService<PostCourseRequestDto, PostCourseResponseDto>;

  constructor(@InjectModel('course') courseModel: Model<OdmCourseEntity>) {
    const OrmCourseRepositoryInstance = new TOrmCourseRepository(PgDatabaseSingleton.getInstance());
    const OdmCourseRepositoryInstance = new OdmCourseRepository(courseModel);
    const trainerRepositoryInstance = new OrmTrainerRepository(new OrmTrainerMapper() ,PgDatabaseSingleton.getInstance());
    const categoryRepositoryInstance = new OrmCategoryRepository(new OrmCategoryMapper(), PgDatabaseSingleton.getInstance());
    const logger = new NestLogger();

    this.getManyCoursesService = new ExceptionLoggerDecorator( 
      new GetManyCoursesService(OdmCourseRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance), 
      logger
    );
    this.getCourseByIdService = new ExceptionLoggerDecorator(
      new GetCourseByIdService(OdmCourseRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance), 
      logger
    );
    this.getCourseCountService = new ExceptionLoggerDecorator(
      new GetCourseCountService(OdmCourseRepositoryInstance),
      logger
    );
    this.postCourseService = new ExceptionLoggerDecorator(
      new ServiceDBLoggerDecorator(
        new PostCourseService(OrmCourseRepositoryInstance, trainerRepositoryInstance, categoryRepositoryInstance),
        new OrmAuditRepository(PgDatabaseSingleton.getInstance()),
      ),
      logger
    );
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
    
    if (result.isSuccess)
    {
      return result.Value;
    } else {
      throw ExceptionMapper.toHttp(result.Error);
    }
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
      manyCoursesQueryDto.perpage);

    const result = await this.getManyCoursesService.execute(request);
    
    if (result.isSuccess)
    {
      return result.Value;
    } else {
      throw ExceptionMapper.toHttp(result.Error);
    }
    
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

    if (result.isSuccess) {
      return result.Value;
    } else {
      throw ExceptionMapper.toHttp(result.Error);
    }
  }

  @Post()
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  async postCourse(@Body() postCourseBodyDto: PostCourseBodyDto) {

  }
}