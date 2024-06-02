import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetAllCoursesService, GetManyCoursesRequest, GetManyCoursesResponse } from "src/course/application/services/getAllCourses.service";
import { GetCourseByIdService, GetCourseByIdRequest, GetCourseByIdResponse } from "src/course/application/services/getCourseById.service";
import { TOrmCourseRepository } from "../repositories/TOrmCourse.repository";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { ServiceLoggerDecorator } from "src/common/application/aspects/serviceLoggerDecorator";
import { FsPromiseLogger } from "src/common/infraestructure/adapters/FsPromiseLogger";
import { IService } from "src/common/application/interfaces/IService";
import { Course } from "src/course/domain/Course";

@ApiTags('Course')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('course')
export class CourseController {
  private readonly getAllCoursesService: IService<GetManyCoursesRequest, GetManyCoursesResponse>;
  private readonly getCourseByIdService: IService<GetCourseByIdRequest, GetCourseByIdResponse>;

  constructor() {
    const repositoryInstance = new TOrmCourseRepository(DatabaseSingleton.getInstance());
    this.getAllCoursesService = new ServiceLoggerDecorator(new GetAllCoursesService(repositoryInstance), new FsPromiseLogger("serviceUse.log"));
    this.getCourseByIdService = new ServiceLoggerDecorator(new GetCourseByIdService(repositoryInstance), new FsPromiseLogger("serviceUse.log"));
  }


  @Get('one/:id')
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  getCourseById(@Param('id') courseId: string) {
    const request = new GetCourseByIdRequest(courseId);
    return this.getCourseByIdService.execute(request);
  }

  @Get("many")
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  getAllCourses() {
    const request = new GetManyCoursesRequest();
    return this.getAllCoursesService.execute(request);
  }
}