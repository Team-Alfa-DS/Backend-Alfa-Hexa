import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { LessonEntity } from './entities/lesson.entity';
import { CourseController } from './controllers/course.controller';
import { GetCourseByIdService } from '../application/services/getCourseById.service';
import { GetAllCoursesService } from '../application/services/getAllCourses.service';

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity, LessonEntity])],
    controllers: [CourseController],
    providers: [GetCourseByIdService, GetAllCoursesService]
})
export class CourseModule {}
