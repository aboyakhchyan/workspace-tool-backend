import { ConfigService } from '@nestjs/config';

export const isDev = (configService: ConfigService) => {
  const nodeEnv = configService.getOrThrow<string>('nodeEnv');

  return nodeEnv === 'developement';
};
