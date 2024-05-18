import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Lesson])]
})
export class CourseModule {}
