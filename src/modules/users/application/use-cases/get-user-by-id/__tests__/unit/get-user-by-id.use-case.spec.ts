import { Email } from 'src/shared/domain/value-objects/email/email.value-object';
import { GetUserByIdUseCase } from '../../get-user-by-id.use-case';
import { Name } from 'src/shared/domain/value-objects/name/name.value-object';
import { NotFoundError } from 'src/shared/domain/errors/not-found.error';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { UserRepositoryInterface } from 'src/modules/users/domain/repositories/user.repository';

describe('GetUserByIdUseCase unit tests', () => {
  let useCase: GetUserByIdUseCase;
  let userRepository: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryInterface>;

    useCase = new GetUserByIdUseCase(userRepository);
  });

  it('deve retornar o usuário quando encontrado pelo ID', async () => {
    const mockUser = UserEntity.create({
      name: Name.create('John Doe'),
      email: Email.create('john@example.com'),
    });

    userRepository.findById.mockResolvedValue(mockUser);

    const result = await useCase.execute(mockUser.id);

    expect(userRepository.findById).toHaveBeenCalled();
    expect(result).toEqual(mockUser.toJSON());
  });

  it('deve lançar NotFoundError quando usuário não for encontrado', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('invalid-id')).rejects.toThrow(NotFoundError);
    expect(userRepository.findById).toHaveBeenCalledWith('invalid-id');
  });
});
