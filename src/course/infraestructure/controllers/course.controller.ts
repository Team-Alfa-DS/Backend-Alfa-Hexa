/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Inject, Param, UseGuards, Query, HttpException, ParseUUIDPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetManyCoursesService, GetManyCoursesRequest, GetManyCoursesResponse } from "src/course/application/services/getManyCourses.service";
import { GetCourseByIdService, GetCourseByIdRequest, GetCourseByIdResponse } from "src/course/application/services/getCourseById.service";
import { TOrmCourseRepository } from "../repositories/TOrmCourse.repository";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
import { ServiceLoggerDecorator } from "src/common/application/aspects/serviceLoggerDecorator";
import { FsPromiseLogger } from "src/common/infraestructure/adapters/FsPromiseLogger";
import { IService } from "src/common/application/interfaces/IService";
import { Course } from "src/course/domain/aggregates/Course";
import { GetManyCoursesQueryDto } from "../dtos/getManyCoursesQuery.dto";
import { ExceptionLoggerDecorator } from "src/common/application/aspects/exceptionLoggerDecorator";
import { NestLogger } from "src/common/infraestructure/logger/nest-logger";
import { ServiceDBLoggerDecorator } from "src/common/application/aspects/serviceDBLoggerDecorator";
import { OrmAuditRepository } from "src/common/infraestructure/repository/orm-audit.repository";
import { CourseEntity } from "../entities/course.entity";
import { GetCourseCountQueryDto } from "../dtos/getCourseCountQuery.dto";
import { GetCourseCountRequest, GetCourseCountResponse, GetCourseCountService } from "src/course/application/services/getCourseCount.service";

@ApiTags('Course')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('course')
export class CourseController {
  private readonly getManyCoursesService: IService<GetManyCoursesRequest, GetManyCoursesResponse>;
  private readonly getCourseByIdService: IService<GetCourseByIdRequest, GetCourseByIdResponse>;
  private readonly getCourseCountService: IService<GetCourseCountRequest, GetCourseCountResponse>;

  constructor() {
    const repositoryInstance = new TOrmCourseRepository(DatabaseSingleton.getInstance());
    const logger = new NestLogger();

    this.getManyCoursesService = new ExceptionLoggerDecorator( 
      new GetManyCoursesService(repositoryInstance), 
      logger
    );
    this.getCourseByIdService = new ExceptionLoggerDecorator(
      new GetCourseByIdService(repositoryInstance), 
      logger
    );
    this.getCourseCountService = new ExceptionLoggerDecorator(
      new GetCourseCountService(repositoryInstance),
      logger
    )
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/:id')
  @ApiCreatedResponse({
    description: 'se encontro el curso correctamente',
    type: CourseEntity,
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
      throw new HttpException(result.Message, result.StatusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("many")
  @ApiQuery({name: 'filter', required:false})
  @ApiQuery({name: 'category', required:false})
  @ApiQuery({name: 'trainer', required:false})
  @ApiCreatedResponse({
    description: 'se retorno la totalidad de cursos',
    type: CourseEntity,
  })
  @ApiBadRequestResponse({
    description: 'No se encontraron cursos.'
  })
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  async getAllCourses(@Query() manyCoursesQueryDto: GetManyCoursesQueryDto) {
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
      throw new HttpException(result.Message, result.StatusCode);
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
      throw new HttpException(result.Message, result.StatusCode)
    }
  }
}