import { ConflictError } from 'src/shared/domain/errors/conflict.error';
import { CreateUserUseCaseValidator } from './validators/create-user.use-case.validator';
import { Email } from 'src/shared/domain/value-objects/email/email.value-object';
import { Name } from 'src/shared/domain/value-objects/name/name.value-object';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { UserRepositoryInterface } from 'src/modules/users/domain/repositories/user.repository';

export interface CreateUserInputInterface {
  name: string;
  email: string;
}

/**
 * Caso de uso responsável por criar um novo usuário.
 */
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly createUserValidator: CreateUserUseCaseValidator = new CreateUserUseCaseValidator(),
  ) {}

  /**
   * Executa a criação de um novo usuário com base nos dados fornecidos.
   *
   * @param input - Dados necessários para criar o usuário (nome e email).
   * @returns Os dados do usuário criado em formato serializado.
   * @throws ConflictError - Caso já exista um usuário com o email informado.
   */
  async execute(
    input: CreateUserInputInterface,
  ): Promise<CreateUserOutputInterface> {
    this.createUserValidator.validate(input);

    const userAlreadyExists = await this.userRepository.findByEmail(
      input.email,
    );

    if (userAlreadyExists) {
      throw new ConflictError(
        'Já existe um usuário cadastrado com esse endereço de email',
      );
    }

    const user = UserEntity.create({
      name: Name.create(input.name),
      email: Email.create(input.email),
    });

    await this.userRepository.create(user);

    return user.toJSON();
  }
}

export type CreateUserOutputInterface = ReturnType<UserEntity['toJSON']>;
