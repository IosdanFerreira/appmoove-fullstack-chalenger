import { NotFoundError } from 'src/shared/domain/errors/not-found.error';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { UserRepositoryInterface } from 'src/modules/users/domain/repositories/user.repository';

/**
 * Caso de uso responsável por buscar um usuário pelo seu ID.
 */
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  /**
   * Executa o caso de uso: busca o usuário pelo ID informado.
   *
   * @param id - ID do usuário a ser buscado
   * @returns Dados do usuário no formato serializado
   * @throws NotFoundError - se nenhum usuário for encontrado com o ID fornecido
   */
  async execute(id: string): Promise<GetUserByIdOutputInterface> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError('Nenhum usuário encontrado para o ID informado');
    }

    return user.toJSON();
  }
}

export type GetUserByIdOutputInterface = ReturnType<UserEntity['toJSON']>;
