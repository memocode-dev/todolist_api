import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { Express } from 'express';
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

  await app.listen(9090);
}

bootstrap();
