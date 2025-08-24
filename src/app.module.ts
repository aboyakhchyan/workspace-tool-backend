import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { PrismaClientModule } from './prisma-client/prisma-client.module';
import { envConfig, validationSchema } from '@common/configs';
import { MulterConfigModule } from './multer/multer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      validationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    AuthModule,
    UserModule,
    WorkspaceModule,
    PrismaClientModule,
    ConfigModule,
    MulterConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
