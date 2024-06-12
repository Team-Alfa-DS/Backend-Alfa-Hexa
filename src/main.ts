/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  
  const ser = await NestFactory.createMicroservice( {
    transport: Transport.RMQ,
    options: {
    urls: ['amqp://localhost:5672'],
    queue: 'cats_queue',
    queueOptions: {
    durable: false,
  },
  },
  });
  
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Alfa Backend Hexagonal')
    .setDescription('Endpoints API REST Alfa')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true
  }))

  app.enableCors();
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
