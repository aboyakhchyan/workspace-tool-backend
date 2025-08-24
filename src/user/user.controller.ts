import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { ApiCommonException, Auth } from '@common/decorators/metod';
import { User } from '@common/decorators/param/user.decorator';
import { IPayload, IUser } from './interfaces/user.interface';
import { Upload } from '@common/decorators/param/upload.decorator';
import { ProfilePictureValidationPipe } from '@common/pipes';
import { UpdateUserDto } from './dto/update-user.dto';

@Auth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('@me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProfileDto })
  @ApiCommonException()
  async profile(@User('id', ParseIntPipe) id: number): Promise<IUser> {
    return this.userService.findUser(id);
  }

  @Patch('@me/update/picture')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOkResponse()
  @ApiCommonException()
  @Upload('file')
  async uploadProfilePicture(
    @UploadedFile(ProfilePictureValidationPipe) file: Express.Multer.File,
    @User('id', ParseIntPipe) id: number,
  ): Promise<IPayload> {
    return this.userService.uploadProfilePicture(file, id);
  }

  @Patch('@me/update')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOkResponse()
  @ApiCommonException()
  async updateProfile(
    @Body() data: UpdateUserDto,
    @User('id', ParseIntPipe) id: number,
  ): Promise<IUser> {
    return this.userService.updateProfile(data, id);
  }
}
