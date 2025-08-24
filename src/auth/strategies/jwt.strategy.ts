import { IJwtPayload } from '@common/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User as UserModel } from '@prisma/client';
import { AuthService } from 'auth/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.access'),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: IJwtPayload): Promise<Omit<UserModel, 'password'>> {
    return this.authService.validate(payload.id);
  }
}
