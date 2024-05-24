import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogModule } from './blog/infraestructure/blog.module';
import { CourseModule } from './course/infraestructure/course.module';
import { NotifyModule } from './notify/infraestructure/notify.module';
import { CommentModule } from './comment/infraestructure/comment.module';
import { TrainerModule } from './trainer/infraestructure/trainer.module';
import { CategoryModule } from './category/infraestructure/category.module';
import { CommonModule } from './common/infraestructure/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/infraestructure/strategies/jwt.strategy';
import { UserController } from './user/infraestructure/controllers/user.controller';
import { AuthController } from './auth/infraestructure/controller/auth.controller';
// import { ConfigPostgres } from './common/infraestructure/database/config';
import { ProgressController } from './progress/infraestructure/controller/progress.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/src/*/.entity{.ts,.js}'],
      synchronize: true,
  }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.getOrThrow('JWT'),
        signOptions: {expiresIn: '10d'}
      })
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: configService.getOrThrow('EMAIL_USERNAME'),
            pass: configService.getOrThrow('EMAIL_PASSWORD'),
            clientId: configService.getOrThrow('OAUTH_CLIENT_ID'),
            clientSecret: configService.getOrThrow('OAUTH_CLIENT_SECRET'),
            refreshToken: configService.getOrThrow('OAUTH_REFRESH_TOKEN'),
          }
        }
      })
    }),
    BlogModule, 
    CourseModule, 
    NotifyModule, 
    CommentModule, 
    TrainerModule, 
    CategoryModule, 
    CommonModule
  ],
  controllers: [
    UserController,
    AuthController,
    ProgressController
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
