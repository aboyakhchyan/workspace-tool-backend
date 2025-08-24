import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { ApiCommonException, Auth } from '@common/decorators/metod';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserDto })
  @ApiCommonException()
  async signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginUserDto })
  @ApiCommonException()
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() user: LoginUserDto,
  ) {
    return this.authService.signIn(res, user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ schema: { example: { message: 'ok' } } })
  @ApiCommonException()
  async signOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(res);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCommonException()
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req);
  }
}
