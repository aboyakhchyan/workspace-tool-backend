import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export const Upload = (filedName: string = '') => {
  return applyDecorators(UseInterceptors(FileInterceptor(filedName)));
};
