import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from '@/common/exception/error';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const httpRes = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    return httpRes.status(status).json({
      code: 500,
      message: 'INTERNAL ERROR',
    });
  }
}

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorCode = exception.getResponse() as ErrorCode;

    response.status(status).json(errorCode);
  }
}

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorCode = exception.getResponse() as ErrorCode;

    response.status(status).json(errorCode);
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorCode = exception.getResponse() as ErrorCode;

    response.status(status).json(errorCode);
  }
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.getResponse() instanceof ValidationError) {
      const validationError = exception.getResponse() as ValidationError;

      const [code, message] = Object.values(
        validationError.constraints,
      )[0].split(':', 2);

      if (!code || !message) {
        response.status(HttpStatus.BAD_REQUEST).json({
          code: 'VALIDATION_ERROR',
          message: Object.values(validationError.constraints)[0],
        });
      } else {
        response.status(HttpStatus.BAD_REQUEST).json({
          code,
          message,
        });
      }
    } else {
      const errorCode = exception.getResponse() as ErrorCode;
      response.status(HttpStatus.BAD_REQUEST).json(errorCode);
    }
  }
}

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorCode = exception.getResponse() as ErrorCode;

    response.status(status).json(errorCode);
  }
}
