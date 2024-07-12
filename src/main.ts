import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Express, json, urlencoded } from 'express';
import {
  BadRequestExceptionFilter,
  ForbiddenExceptionFilter,
  HttpExceptionFilter,
  InternalServerErrorExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter,
} from '@/common/exception/exception.filter';

function settingSwagger(app: INestApplication<Express>) {
  const config = new DocumentBuilder().setTitle('todolist_api').build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  settingSwagger(app);

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
    new NotFoundExceptionFilter(),
    new InternalServerErrorExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Location'],
  });

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));

  await app.listen(9090);
}

bootstrap();
