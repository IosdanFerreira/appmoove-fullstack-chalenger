import { CreateUserUseCase } from '../application/use-cases/create-user/create-user.use-case';
import { CreateUserValidator } from '../domain/entities/validators/create-user-entity.validator';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id/get-user-by-id.use-case';
import { GetUsersUseCase } from '../application/use-cases/get-users/get-users.use-case';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma.service';
import { PrismaUserRepository } from './database/prisma/repositories/prisma-user.repository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: 'PrismaUserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new PrismaUserRepository(prismaService);
      },
      inject: [PrismaService],
    },
    CreateUserValidator,
    {
      provide: CreateUserUseCase,
      useFactory: (prismaUserRepository: PrismaUserRepository) => {
        return new CreateUserUseCase(prismaUserRepository);
      },
      inject: ['PrismaUserRepository'],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory: (prismaUserRepository: PrismaUserRepository) => {
        return new GetUserByIdUseCase(prismaUserRepository);
      },
      inject: ['PrismaUserRepository'],
    },
    {
      provide: GetUsersUseCase,
      useFactory: (prismaUserRepository: PrismaUserRepository) => {
        return new GetUsersUseCase(prismaUserRepository);
      },
      inject: ['PrismaUserRepository'],
    },
  ],
})
export class UserModule {}
