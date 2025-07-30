import {
  Controller,
  Inject,
  HttpStatus,
  Param,
  Get,
  Query,
  Body,
  Post,
  HttpCode,
} from '@nestjs/common';
import {
  UserCollectionPresenter,
  UserPresenter,
} from './presenters/user.presenter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id/get-user-by-id.use-case';
import { CreateUserUseCase } from '../application/use-cases/create-user/create-user.use-case';
import { GetUsersUseCase } from '../application/use-cases/get-users/get-users.use-case';
import { InputSearchInterface } from 'src/shared/application/interfaces/input-search.interface';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  @Inject(CreateUserUseCase)
  private createUserUseCase: CreateUserUseCase;

  @Inject(GetUserByIdUseCase)
  private getUserByIdUseCase: GetUserByIdUseCase;

  @Inject(GetUsersUseCase)
  private getUsersUseCase: GetUsersUseCase;

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const output = await this.createUserUseCase.execute(createUserDto);

    return UserPresenter.present(
      output,
      HttpStatus.CREATED,
      'Usuário criado com sucesso',
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lista usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
  @HttpCode(HttpStatus.OK)
  async getUsers(@Query() query: InputSearchInterface) {
    const output = await this.getUsersUseCase.execute(query);

    return UserCollectionPresenter.present(
      output.items,
      HttpStatus.OK,
      output.meta,
      'Lista de usuários retornada com sucesso',
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário retornado com sucesso' })
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    const output = await this.getUserByIdUseCase.execute(id);

    return UserPresenter.present(
      output,
      HttpStatus.OK,
      'Usuário retornado com sucesso',
    );
  }
}
