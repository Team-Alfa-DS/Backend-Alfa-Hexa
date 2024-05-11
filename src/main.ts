import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
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
