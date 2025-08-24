import { IException } from '@common/interfaces';
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const serverError = {
      message: 'Internal server error',
      error: 'Server error',
      statusCode: 500,
    } as IException;

    const response =
      exception instanceof HttpException
        ? (exception.getResponse() as IException)
        : serverError;

    const message = Array.isArray(response.message)
      ? response.message[0]
      : response.message;

    res.status(status).json({
      ...response,
      message,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
