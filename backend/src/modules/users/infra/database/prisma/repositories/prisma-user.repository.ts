// src/modules/users/infra/repositories/prisma-user.repository.ts
import { Injectable } from '@nestjs/common';
import { InputSearchInterface } from 'src/shared/application/interfaces/input-search.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma.service';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserModelMapper } from '../mappers/user-model.mapper';
import { UserRepositoryInterface } from '../../../../domain/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: user.toJSON(),
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return user ? UserModelMapper.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return user ? UserModelMapper.toEntity(user) : null;
  }

  async findAll(searchParams: InputSearchInterface): Promise<UserEntity[]> {
    const skip = (searchParams.page - 1) * searchParams.perPage;

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      [searchParams.sort || 'createdAt']: searchParams.sortDirection,
    };

    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchParams.search } },
          { email: { contains: searchParams.search } },
        ],
      },
      skip,
      take: Number(searchParams.perPage),
      orderBy,
    });

    return users.map((user) => UserModelMapper.toEntity(user));
  }

  async count(search?: string): Promise<number> {
    return this.prisma.user.count({
      where: search
        ? {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } },
            ],
          }
        : undefined,
    });
  }

  protected async _get(id: string): Promise<UserEntity> {
    if (!this.isValidUUID(id)) {
      return null;
    }

    // Consulta o banco de dados para encontrar um usuário pelo seu ID
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }
    // Mapeia o modelo de usuário recuperado para uma entidade de usuário
    return UserModelMapper.toEntity(user);
  }

  private isValidUUID(uuid: string): boolean {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  }
}
