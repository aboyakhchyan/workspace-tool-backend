import { Injectable } from '@nestjs/common';
import { UserWorkspace as UserWorkspaceModel } from '@prisma/client';
import { PrismaClientService } from 'prisma-client/prisma-client.service';
import { BasePSQLRepository } from 'prisma-client/repositories';

@Injectable()
export class UserWorkspaceRepository extends BasePSQLRepository<UserWorkspaceRepository> {
  constructor(protected readonly prisma: PrismaClientService) {
    super(prisma, 'UserWorkspace');
  }

  async deleteWorkspace(id: number, userId: number) {
    return this.prisma['UserWorkspace'].delete({ where: { workspaceId: id, userId } });
  }
}
