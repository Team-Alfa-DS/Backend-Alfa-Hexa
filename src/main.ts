import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Alfa Backend Hexagonal')
    .setDescription('Endpoints API REST Alfa')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true
  }))
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });

  app.enableCors();
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
