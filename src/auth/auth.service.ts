import { IJwt, IJwtPayload } from '@common/interfaces';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, verify } from 'argon2';
import { User as UserModel } from '@prisma/client';
import { Request, Response } from 'express';
import { isDev } from '@common/utils';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly JWT: IJwt;
  constructor(
    private readonly userRepo: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT = this.configService.getOrThrow<IJwt>('jwt');
  }

  async signUp(data: CreateUserDto) {
    const { email, password } = data;
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await hash(password);

    const createdUser = await this.userRepo.create({
      ...data,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  async signIn(res: Response, user: LoginUserDto) {
    const { email, password } = user;

    const existingUser = await this.userRepo.findByEmail(email);

    if (!existingUser) {
      throw new BadRequestException('Something went wrong, Invalid data');
    }

    const correctPassword = await verify(existingUser.password, password);

    if (!correctPassword) {
      throw new BadRequestException('Something went wrong, Invalid data');
    }

    const payload = this.auth(res, existingUser.id);

    return payload;
  }

  async signOut(res: Response): Promise<{ message: string }> {
    this.clearCookie(res);

    return { message: 'ok' };
  }

  async refresh(req: Request) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Token invalid');
    }

    const payload: IJwtPayload = await this.jwtService.verifyAsync(
      refreshToken,
      { secret: this.JWT.refresh },
    );

    const user = await this.userRepo.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken,
    };
  }

  async validate(id: number): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;

    return result;
  }

  private auth(res: Response, id: number) {
    const accessToken = this.generateAccessToken(id);
    const refreshToken = this.generateRefreshToken(id);

    this.setCookie(res, refreshToken);

    return {
      accessToken,
    };
  }

  private setCookie(res: Response, token: string): void {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: !isDev(this.configService),
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  private clearCookie = (res: Response): void => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: !isDev(this.configService),
      sameSite: 'lax',
    });
  };

  private generateAccessToken = (id: number): string => {
    return this.jwtService.sign(
      { id },
      {
        secret: this.JWT.access,
        expiresIn: this.JWT.accessTtl,
      },
    );
  };

  private generateRefreshToken = (id: number): string => {
    return this.jwtService.sign(
      { id },
      { secret: this.JWT.refresh, expiresIn: this.JWT.refreshTtl },
    );
  };
}
