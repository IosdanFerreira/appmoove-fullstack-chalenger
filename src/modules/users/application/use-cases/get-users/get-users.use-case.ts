import { InputSearchInterface } from 'src/shared/application/interfaces/input-search.interface';
import { PaginationOutputInterface } from 'src/shared/application/interfaces/pagination-output';
import { PaginationUtil } from 'src/shared/application/utils/pagination.utils';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { UserRepositoryInterface } from 'src/modules/users/domain/repositories/user.repository';

export interface GetUsersOutput {
  data: ReturnType<UserEntity['toJSON']>[];
  page: number;
  perPage: number;
}

/**
 * Caso de uso para obter uma lista paginada de usuários com filtros e ordenação.
 */
export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  /**
   * Executa o caso de uso para buscar usuários.
   * Aplica paginação, filtros de busca por texto, ordenação e retorna dados paginados.
   *
   * @param input - Parâmetros de busca, paginação e ordenação.
   * @returns Um objeto com os usuários filtrados, e metadados da paginação.
   */
  async execute(
    input: InputSearchInterface,
  ): Promise<PaginationOutputInterface<ReturnType<UserEntity['toJSON']>>> {
    const {
      page = 1,
      perPage = 10,
      sort = 'createdAt',
      sortDirection = 'desc',
      search = '',
    } = input;

    const [users, count] = await Promise.all([
      this.userRepository.findAll(input),

      this.userRepository.count(search),
    ]);

    // Gera os metadados de paginação
    const pagination = PaginationUtil.buildPagination(count, page, perPage);

    return {
      items: users.map((user) => user.toJSON()),
      meta: {
        pagination,
        sort,
        sortDirection,
        search,
      },
    };
  }
}
