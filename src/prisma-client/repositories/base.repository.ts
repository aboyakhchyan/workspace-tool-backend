import { IBaseRepository } from '@common/interfaces';
import { PrismaClient } from '@prisma/client';

type ModelName = keyof PrismaClient;

export abstract class BasePSQLRepository<T> implements IBaseRepository<T> {
  protected readonly prisma: PrismaClient;
  private readonly modelName: ModelName;

  constructor(prisma: PrismaClient, modelName: ModelName) {
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
