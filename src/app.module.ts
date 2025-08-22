import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { PrismaClientModule } from './prisma-client/prisma-client.module';
import { envConfig, validationSchema } from '@common/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      validationSchema,
    }),
    AuthModule,
    UserModule,
    WorkspaceModule,
    PrismaClientModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
