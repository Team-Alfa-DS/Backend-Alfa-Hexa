/* eslint-disable @typescript-eslint/no-unused-vars */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/infraestructure/strategies/jwt.strategy';
import { UserController } from './user/infraestructure/controllers/user.controller';
import { AuthController } from './auth/infraestructure/controller/auth.controller';
// import { ConfigPostgres } from './common/infraestructure/database/config';
import { ProgressController } from './progress/infraestructure/controller/progress.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { CourseController } from './course/infraestructure/controllers/course.controller';
import { MailjetModule } from 'nest-mailjet';
import { CloudinaryProvider } from './common/infraestructure/providers/cloudinary.provider';
import { TrainerController } from './trainer/infraestructure/controller/trainer.controller';
import { CategoryController } from './category/infraestructure/controller/category.controller';
import { SearchController } from './search/infraestructure/controller/search.controller';
import { CommentController } from './comment/infraestructure/controller/comment.controller';
import { BlogController } from './blog/infraestructure/controllers/blog.controller';
import { notifycontroller } from './notify/notify/Infraestructure/controller/notify.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options:
        {
          urls:['amqp://localhost:5672'],
          queue:'orders-queue'
        }
      }
    ]),
    
    
    ConfigModule.forRoot(), 
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
    MailjetModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.getOrThrow('MAILJET_API_KEY'),
        apiSecret: configService.getOrThrow('MAILJET_API_SECRET'),
      })
    }),
    OrdersModule,
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
  providers: [JwtStrategy, CloudinaryProvider],
})
export class AppModule {}
