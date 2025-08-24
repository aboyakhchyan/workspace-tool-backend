import { Injectable } from '@nestjs/common';
import { Workspace as WorkspaceModel } from '@prisma/client';
import { PrismaClientService } from 'prisma-client/prisma-client.service';
import { BasePSQLRepository } from 'prisma-client/repositories';

@Injectable()
export class WorkspaceRepository extends BasePSQLRepository<WorkspaceModel> {
  constructor(protected readonly prisma: PrismaClientService) {
    super(prisma, 'Workspace');
  }

  async findById(id: number) {
    return this.prisma['Workspace'].findUnique({
      where: { id },
      include: {
        members: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma['Workspace'].findUnique({
      where: { slug },
      include: {
        members: {
            include: {
                user: true
            }
        }
      },
    });
  }

  async findManyByAuthorId(userId: number) {
    return this.prisma['Workspace'].findMany({
      include: {
        members: {
          where: { userId },
        },
      },
    });
  }
}
