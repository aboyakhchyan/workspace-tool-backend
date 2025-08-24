import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IPayload, IUser } from './interfaces/user.interface';
import { MulterService } from 'multer/multer.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly multerService: MulterService,
  ) {}

  async findUser(id: number): Promise<IUser> {
    const existingUser = await this.userRepo.findById(id);

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const { password, ...userWithoutPassword } = existingUser;

    return userWithoutPassword as IUser;
  }

  async uploadProfilePicture(
    file: Express.Multer.File,
    id: number,
  ): Promise<IPayload> {
    const existingUser = await this.userRepo.findById(id);

    if (!existingUser) {
      throw new BadRequestException(`User not found`);
    }

    if (existingUser.picture) {
      this.multerService.delete(existingUser.picture);
    }

    const newFilePath = await this.multerService.save(file);

    await this.userRepo.update(id, { picture: newFilePath });

    return { payload: newFilePath };
  }

  async updateProfile(data: UpdateUserDto, id: number): Promise<IUser> {
    const existingUser = await this.userRepo.findById(id);

    if (!existingUser) {
      throw new BadRequestException(`User not found`);
    }

    const updatedUser = await this.userRepo.update(id, data) as IUser;
    
    const {password, ...userWithoutPassword} = updatedUser;

    return userWithoutPassword;
  }
}
