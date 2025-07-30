import { ConflictError } from 'src/shared/domain/errors/conflict.error';
import { CreateUserUseCase } from '../../create-user.use-case';
import { Email } from 'src/shared/domain/value-objects/email/email.value-object';
import { Name } from 'src/shared/domain/value-objects/name/name.value-object';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { UserRepositoryInterface } from 'src/modules/users/domain/repositories/user.repository';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findByID: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryInterface>;

    useCase = new CreateUserUseCase(userRepository);
  });

  it('deve criar um novo usuário quando o email não está em uso', async () => {
    const input = { name: 'John Doe', email: 'john@example.com' };
    userRepository.findByEmail.mockResolvedValue(null);

    await useCase.execute(input);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        name: input.name,
        email: input.email,
        createdAt: expect.any(Date),
      }),
    );

    const createdUser = userRepository.create.mock.calls[0][0] as UserEntity;
    expect(createdUser.name).toBe(input.name);
    expect(createdUser.email).toBe(input.email);
  });

  it('deve lançar erro se já existir um usuário com o email informado', async () => {
    const input = { name: 'Jane Doe', email: 'jane@example.com' };

    const existingUser = UserEntity.create({
      name: Name.create(input.name),
      email: Email.create(input.email),
    });

    userRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(useCase.execute(input)).rejects.toThrow(ConflictError);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro se nome ou email forem inválidos (value object)', async () => {
    const input = { name: '', email: 'invalid' };

    await expect(() => useCase.execute(input)).rejects.toThrow();
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
