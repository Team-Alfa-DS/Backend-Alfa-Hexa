import { Controller, Get, Inject, Param, UseGuards, Query, HttpException } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetManyCoursesService, GetManyCoursesRequest, GetManyCoursesResponse } from "src/course/application/services/getManyCourses.service";
import { GetCourseByIdService, GetCourseByIdRequest, GetCourseByIdResponse } from "src/course/application/services/getCourseById.service";
import { TOrmCourseRepository } from "../repositories/TOrmCourse.repository";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";
import { ServiceLoggerDecorator } from "src/common/application/aspects/serviceLoggerDecorator";
import { FsPromiseLogger } from "src/common/infraestructure/adapters/FsPromiseLogger";
import { IService } from "src/common/application/interfaces/IService";
import { Course } from "src/course/domain/Course";
import { GetManyCoursesQueryDto } from "../dtos/getManyCoursesQuery.dto";

@ApiTags('Course')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('course')
export class CourseController {
  private readonly getManyCoursesService: IService<GetManyCoursesRequest, GetManyCoursesResponse>;
  private readonly getCourseByIdService: IService<GetCourseByIdRequest, GetCourseByIdResponse>;

  constructor() {
    const repositoryInstance = new TOrmCourseRepository(DatabaseSingleton.getInstance());
    this.getManyCoursesService = new ServiceLoggerDecorator(new GetManyCoursesService(repositoryInstance), new FsPromiseLogger("serviceUse.log"));
    this.getCourseByIdService = new ServiceLoggerDecorator(new GetCourseByIdService(repositoryInstance), new FsPromiseLogger("serviceUse.log"));
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/:id')
  async getCourseById(@Param('id') courseId: string) {
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
}