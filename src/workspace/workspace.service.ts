import { BadRequestException, Injectable } from '@nestjs/common';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceNameDto } from './dto/workspace-name.dto';
import { generateSlug } from '@common/utils';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UserWorkspaceRepository } from 'prisma-client/repositories/user-workspace.repository';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly workspaceRepo: WorkspaceRepository,
    private readonly userWorkspaceRepo: UserWorkspaceRepository,
  ) {}

  async searchValidSlug(name: string) {
    let count = 1;
    const baseSlug = generateSlug(name);
    let slug = baseSlug;

    while (true) {
      const existingSlug = await this.workspaceRepo.findBySlug(slug);

      if (existingSlug) {
        slug = `${baseSlug}${count}`;
        count++;
      } else {
        return slug;
      }
    }
  }

  async createWorkspace(workspace: CreateWorkspaceDto, id: number) {
    const existingWorkspace = await this.workspaceRepo.findBySlug(
      workspace.slug,
    );

    if (existingWorkspace) {
      throw new BadRequestException('Workspace already exists');
    }

    const createdWorkspace = await this.workspaceRepo.create(workspace);

    await this.userWorkspaceRepo.create({
      userId: id,
      workspaceId: createdWorkspace.id,
      role: 'author',
    });

    return createdWorkspace;
  }

  async findWorkspaces(id: number, userId: number) {
    return this.workspaceRepo.findManyByAuthorId(userId);
  }

  async deleteWorkspace(id: number) {
    const existingWorkspace = await this.workspaceRepo.findById(id);

    if (!existingWorkspace) {
      throw new BadRequestException('Workspace not found');
    }

    const deletedWorkspace = await this.workspaceRepo.delete(id);

    return deletedWorkspace;
  }

  async findWorkspace(slug: string) {
    return this.workspaceRepo.findBySlug(slug);
  }
}
