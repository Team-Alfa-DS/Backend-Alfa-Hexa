/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/infraestructure/strategies/jwt.strategy';
import { UserController } from './user/infraestructure/controllers/user.controller';
import { AuthController } from './auth/infraestructure/controller/auth.controller';
// import { ConfigPostgres } from './common/infraestructure/database/config';
import { ProgressController } from './progress/infraestructure/controller/progress.controller';
import { CourseController } from './course/infraestructure/controllers/course.controller';
import { MailjetModule } from 'nest-mailjet';
import { CloudinaryProvider } from './common/infraestructure/providers/cloudinary.provider';
import { TrainerController } from './trainer/infraestructure/controller/trainer.controller';
import { CategoryController } from './category/infraestructure/controller/category.controller';
import { SearchController } from './search/infraestructure/controller/search.controller';
import { CommentController } from './comment/infraestructure/controller/comment.controller';
import { BlogController } from './blog/infraestructure/controllers/blog.controller';
import { notifycontroller } from './notify/notify/Infraestructure/controller/notify.controller';
import { ormDatabaseProvider } from './common/infraestructure/providers/orm-database.provider';
import { odmDatabaseProvider } from './common/infraestructure/providers/odm-database.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/infraestructure/entities/odm-entities/odm-user.entity';
import { LessonSchema } from './course/infraestructure/entities/odm-entities/odm-lesson.entity';
import { BlogSchema } from './blog/infraestructure/entities/odm-entities/odm-blog.entity';
import { CourseSchema } from './course/infraestructure/entities/odm-entities/odm-course.entity';
import { ImageSchema } from './blog/infraestructure/entities/odm-entities/odm-image.entity';
import { BlogCommentSchema } from './comment/infraestructure/entities/odm-entities/odm-comment.blog.entity';
import { LessonCommentSchema } from './comment/infraestructure/entities/odm-entities/odm-comment.lesson.entity';
import { CategorySchema } from './category/infraestructure/entities/odm-entities/odm-category.entity';
import { TrainerSchema } from './trainer/infraestructure/entities/odm-entities/odm-trainer.entity';
import { ProgressSchema } from './progress/infraestructure/entities/odm-entities/odm-progress.entity';
import { TagSchema } from './tag/infraestructure/entities/odm-entities/odm-tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.getOrThrow('JWT'),
        signOptions: {expiresIn: '10d'}
      })
    }),
    MailjetModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.getOrThrow('MAILJET_API_KEY'),
        apiSecret: configService.getOrThrow('MAILJET_API_SECRET'),
      })
    }),

    MongooseModule.forRoot(process.env.MONGO_DB_HOST, {dbName: process.env.MONGO_DB_NAME}),

    MongooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema
      },
      {
        name: 'lesson',
        schema: LessonSchema
      },
      {
        name: 'blog',
        schema: BlogSchema
      },
      {
        name: 'course',
        schema: CourseSchema
      },
      {
        name: 'image',
        schema: ImageSchema
      },
      {
        name: 'blog_comment',
        schema: BlogCommentSchema
      },
      {
        name: 'lesson_comment',
        schema: LessonCommentSchema
      },
      {
        name: 'category',
        schema: CategorySchema
      },
      {
        name: 'trainer',
        schema: TrainerSchema
      },
      {
        name: 'progress',
        schema: ProgressSchema
      },
      {
        name: 'tag',
        schema: TagSchema
      }
    ])
  ],
  controllers: [
    UserController,
    AuthController,
    ProgressController,
    CourseController,
    SearchController,
    CommentController,
    CategoryController,
    TrainerController,
    BlogController,
    notifycontroller
  ],
  providers: [JwtStrategy, CloudinaryProvider, ormDatabaseProvider, odmDatabaseProvider],
})
export class AppModule {}
