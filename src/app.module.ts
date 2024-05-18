import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/infraestructure/user.module';
import { AuthModule } from './auth/infraestructure/auth.module';
import { BlogModule } from './blog/infraestructure/blog.module';
import { CourseModule } from './course/infraestructure/course.module';
import { NotifyModule } from './notify/infraestructure/notify.module';
import { CommentModule } from './comment/infraestructure/comment.module';
import { TrainerModule } from './trainer/infraestructure/trainer.module';
import { CategoryModule } from './category/infraestructure/category.module';
import { CommonModule } from './common/infraestructure/common.module';
import { ConfigPostgres } from './common/infraestructure/database/config';

@Module({
  imports: [ConfigModule.forRoot(), ConfigPostgres, UserModule, AuthModule, BlogModule, CourseModule, NotifyModule, CommentModule, TrainerModule, CategoryModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
