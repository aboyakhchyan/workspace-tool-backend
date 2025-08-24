import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IApi, IClient } from '@common/interfaces';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from '@common/filters/all-exception.filter';
import { setupSwagger } from '@common/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const api = configService.getOrThrow<IApi>('api');
  const client = configService.getOrThrow<IClient>('client');

  app.use(cookieParser());
  app.enableCors({
    origin: [client],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  app.setGlobalPrefix(api.prefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());

  setupSwagger(app);

  await app.listen(api.port, () => {
    console.log(`Server runing in http://${api.host}:${api.port}`);
  });
}
bootstrap();
