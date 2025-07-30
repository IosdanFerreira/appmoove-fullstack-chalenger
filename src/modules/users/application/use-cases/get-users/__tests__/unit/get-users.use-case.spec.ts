import { Email } from 'src/shared/domain/value-objects/email/email.value-object';
import { GetUsersUseCase } from '../../get-users.use-case';
import { Name } from 'src/shared/domain/value-objects/name/name.value-object';
import { PaginationUtil } from 'src/shared/application/utils/pagination.utils';
import { SortDirection } from 'src/shared/application/interfaces/input-search.interface';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { UserRepositoryInterface } from 'src/modules/users/domain/repositories/user.repository';

// Mock UserEntity
const mockUsers = [1, 2, 3].map((id) =>
  UserEntity.create({
    name: Name.create(`John Doe`),
    email: Email.create(`john${id}@example.com`),
  }),
);

describe('GetUsersUseCase unit tests', () => {
  let useCase: GetUsersUseCase;
  let userRepository: jest.Mocked<UserRepositoryInterface>;
  let paginationUtil: PaginationUtil;

  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      count: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };

    paginationUtil = new PaginationUtil();
    useCase = new GetUsersUseCase(userRepository, paginationUtil);
  });

  it('deve retornar usuários paginados com metadados', async () => {
    const input = {
      page: 1,
      perPage: 10,
      sort: 'createdAt',
      sortDirection: 'desc' as SortDirection,
      search: '',
    };

    userRepository.findAll.mockResolvedValue(mockUsers);
    userRepository.count.mockResolvedValue(mockUsers.length);

    const result = await useCase.execute(input);

    expect(userRepository.findAll).toHaveBeenCalledWith(input);
    expect(userRepository.count).toHaveBeenCalledWith(input.search);
    expect(result.items).toEqual(mockUsers.map((u) => u.toJSON()));
    expect(result.meta).toEqual({
      pagination: {
        currentPage: 1,
        nextPage: null,
        perPage: 10,
        prevPage: null,
        totalItems: 3,
        totalPages: 1,
      },
      search: '',
      sort: 'createdAt',
      sortDirection: 'desc',
    });
  });

  it('deve retornar dados vazios se nenhum usuário for encontrado', async () => {
    userRepository.findAll.mockResolvedValue([]);
    userRepository.count.mockResolvedValue(0);

    const result = await useCase.execute({
      page: 1,
      perPage: 10,
      sort: 'createdAt',
      sortDirection: 'desc' as SortDirection,
      search: '',
    });

    expect(result.items).toEqual([]);
    expect(result.meta).toEqual({
      pagination: {
        currentPage: 1,
        nextPage: null,
        perPage: 10,
        prevPage: null,
        totalItems: 0,
        totalPages: 0,
      },
      search: '',
      sort: 'createdAt',
      sortDirection: 'desc',
    });
  });
});
