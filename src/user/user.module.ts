import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MulterConfigModule } from 'multer/multer.module';

@Module({
  imports: [MulterConfigModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
