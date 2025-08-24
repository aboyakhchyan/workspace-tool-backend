import { IBaseRepository } from '@common/interfaces';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientService } from 'prisma-client/prisma-client.service';

export abstract class BasePSQLRepository<T> implements IBaseRepository<T> {
  protected readonly prisma: PrismaClientService;
  private readonly modelName: Prisma.ModelName;

  constructor(prisma: PrismaClientService, modelName: Prisma.ModelName) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  async findMany(): Promise<T[]> {
    return this.prisma[this.modelName].findMany();
  }

  async findById(id: number): Promise<T | null> {
    return this.prisma[this.modelName].findUnique({ where: { id } });
  }

  async create(data: any): Promise<T> {
    return this.prisma[this.modelName].create({ data });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.prisma[this.modelName].update({ where: { id }, data });
  }

  async delete(id: number): Promise<T> {
    return this.prisma[this.modelName].delete({ where: { id } });
  }
}
