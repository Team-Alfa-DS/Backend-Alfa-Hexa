import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { LessonEntity } from './entities/lesson.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity, LessonEntity])]
})
export class CourseModule {}
