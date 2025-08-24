import { Injectable } from '@nestjs/common';
import {  User as UserModel } from '@prisma/client';
import { PrismaClientService } from 'prisma-client/prisma-client.service';
import { BasePSQLRepository } from 'prisma-client/repositories';

@Injectable()
export class UserRepository extends BasePSQLRepository<UserModel> {
  constructor(protected readonly prisma: PrismaClientService) {
    super(prisma, 'User');
  }

  async findByEmail(email: string): Promise<UserModel> {
    return this.prisma['User'].findUnique({ where: { email } });
  }
}
