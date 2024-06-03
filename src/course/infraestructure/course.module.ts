import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { LessonEntity } from './entities/lesson.entity';
import { CourseController } from './controllers/course.controller';
import { GetCourseByIdService } from '../application/services/getCourseById.service';
import { GetManyCoursesService } from '../application/services/getManyCourses.service';

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity, LessonEntity])],
    controllers: [CourseController],
    providers: [GetCourseByIdService, GetManyCoursesService]
})
export class CourseModule {}
