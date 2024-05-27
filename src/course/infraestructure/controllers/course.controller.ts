import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetAllCoursesService, TGetAllCourses } from "src/course/application/services/getAllCourses.service";
import { GetCourseByIdService, TGetCourseById } from "src/course/application/services/getCourseById.service";
import { TOrmCourseRepository } from "../repositories/TOrmCourse.repository";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { GetManyCoursesQueryDto } from "../dtos/getManyCoursesQuery.dto";
import { ServiceLoggerDecorator } from "src/common/application/aspects/serviceLoggerDecorator";
import { FsPromiseLogger } from "src/common/infraestructure/adapters/FsPromiseLogger";
import { IService } from "src/common/application/interfaces/IService";
import { Course } from "src/course/domain/Course";

@ApiTags('Course')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('course')
export class CourseController {
  private readonly getAllCoursesService: IService<TGetAllCourses, Promise<Course[]>>;
  private readonly getCourseByIdService: IService<TGetCourseById, Promise<Course>>;

  constructor() {
    const repositoryInstance = new TOrmCourseRepository(DatabaseSingleton.getInstance());
    this.getAllCoursesService = new ServiceLoggerDecorator(new GetAllCoursesService(repositoryInstance), new FsPromiseLogger("serviceUse.log"));
    this.getCourseByIdService = new ServiceLoggerDecorator(new GetCourseByIdService(repositoryInstance), new FsPromiseLogger("serviceUse.log"));
  }


  @Get('one/:id')
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  getCourseById(@Param('id') courseId: string) {
    return this.getCourseByIdService.execute(new TGetCourseById(courseId));
  }

  @Get("many")
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el token'})
  getAllCourses(@Query() manyCoursesDto: GetManyCoursesQueryDto) {
    const service = new TGetAllCourses(
      manyCoursesDto.filter,
      manyCoursesDto.category,
      manyCoursesDto.trainer,
      manyCoursesDto.page,
      manyCoursesDto.perpage
    );
    
    return this.getAllCoursesService.execute(service);
  }
}