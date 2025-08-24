import {
  ArgumentMetadata,
  BadRequestException,
  type PipeTransform,
} from '@nestjs/common';

export class ProfilePictureValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!file) {
      throw new BadRequestException('File not found, please upload file');
    }

    const mimieTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxFileSize = 10 * 1024 * 1024;

    const isValidFileSize = maxFileSize > file.size;

    if (!isValidFileSize) {
      throw new Error('Invalid file size');
    }

    const isValidFileType = mimieTypes.includes(file.mimetype);

    if (!isValidFileType) {
      throw new Error('Invalid file type');
    }

    return file;
  }
}
