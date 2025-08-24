import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceRepository } from './workspace.repository';
import { UserWorkspaceRepository } from 'prisma-client/repositories/user-workspace.repository';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceRepository, UserWorkspaceRepository],
})
export class WorkspaceModule {}
