import {
  BadRequestExceptionDto,
  ForbiddenExceptionDto,
  InternalServerExceptionDto,
  NotFoundExceptionDto,
  UnauthorizedExceptionDto,
} from '@common/dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiCommonException = () => {
  return applyDecorators(
    ApiBadRequestResponse({ type: BadRequestExceptionDto }),
    ApiNotFoundResponse({ type: NotFoundExceptionDto }),
    ApiUnauthorizedResponse({ type: UnauthorizedExceptionDto }),
    ApiForbiddenResponse({ type: ForbiddenExceptionDto }),
    ApiInternalServerErrorResponse({ type: InternalServerExceptionDto }),
  );
};
