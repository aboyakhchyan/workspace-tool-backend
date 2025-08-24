import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'user/user.module';
import { WorkspaceModule } from 'workspace/workspace.module';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Workspace Tool Project Documentation')
    .setDescription('OpenAPI for project')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule, AuthModule, UserModule, WorkspaceModule],
    extraModels: [],
  });

  SwaggerModule.setup('docs', app, document);
};
