import { Module } from '@nestjs/common';
import { MulterService } from './multer.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage()
    })
  ],
  providers: [MulterService],
  exports: [MulterService]
})
export class MulterConfigModule {}
