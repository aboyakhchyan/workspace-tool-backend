import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as sharp from 'sharp';

@Injectable()
export class MulterService {
  private readonly PATH_DIR = join(process.cwd(), 'public/');

  constructor() {
    this._ensureUploadDir();
  }

  private _ensureUploadDir() {
    if (!existsSync(this.PATH_DIR)) {
      mkdirSync(this.PATH_DIR, { recursive: true });
    }
  }

  async save(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = `${Date.now()}.webp`;
      const filePath = `${this.PATH_DIR}${fileName}`;

      const webpBuffer = await sharp(file.buffer)
      .webp({ quality: 80 })
      .toBuffer();

      
      writeFileSync(filePath, webpBuffer);

      return fileName;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  delete(filename: string): boolean {
    try {
      if (existsSync(filename)) {
        unlinkSync(filename);
      }
      return true;
    } catch {
      throw new InternalServerErrorException('Error while deleting the file');
    }
  }
}
