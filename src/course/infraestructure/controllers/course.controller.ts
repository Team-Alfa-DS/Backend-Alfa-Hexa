import { Controller, Get, Inject, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetAllCoursesService } from "src/course/application/services/getAllCourses.service";
import { GetCourseByIdService } from "src/course/application/services/getCourseById.service";
import { TOrmCourseRepository } from "../repositories/TOrmCourse.repository";
import { DatabaseSingleton } from "src/common/infraestructure/database/database.singleton";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-guard.guard";

@ApiTags('Course')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@Controller('course')
export class CourseController {
  private readonly getAllCoursesService: GetAllCoursesService;
  private readonly getCourseByIdService: GetCourseByIdService;

  constructor() {
    const repositoryInstance = new TOrmCourseRepository(DatabaseSingleton.getInstance());
    this.getAllCoursesService = new GetAllCoursesService(repositoryInstance);
    this.getCourseByIdService = new GetCourseByIdService(repositoryInstance);  
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/:id')
  getCourseById(@Param('id') courseId: string) {
    return this.getCourseByIdService.execute(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("many")
  getAllCourses() {
    return this.getAllCoursesService.execute();
  }
}