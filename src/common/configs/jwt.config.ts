import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (): Promise<JwtModuleOptions> => ({
  signOptions: {
    algorithm: 'HS256',
  },
  verifyOptions: {
    algorithms: ['HS256'],
    ignoreExpiration: true,
  },
});
