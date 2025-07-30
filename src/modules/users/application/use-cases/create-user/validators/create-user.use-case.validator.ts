import { BadRequestError } from 'src/shared/domain/errors/bad-request.error';
import { CreateUserInputInterface } from '../create-user.use-case';
import { ValidatorStrategyInterface } from 'src/shared/domain/interfaces/validator-strategy.interface';

class NameValidation
  implements ValidatorStrategyInterface<CreateUserInputInterface>
{
  validate(input: CreateUserInputInterface): void {
    if (!input.name) {
      throw new BadRequestError('Nome precisa ser informado');
    }

    if (typeof input.name !== 'string') {
      throw new BadRequestError('name deve ser do tipo string');
    }
  }
}

class EmailValidation
  implements ValidatorStrategyInterface<CreateUserInputInterface>
{
  validate(input: CreateUserInputInterface): void {
    if (!input.email) {
      throw new BadRequestError('Email precisa ser informado');
    }

    if (typeof input.email !== 'string') {
      throw new BadRequestError('email deve ser do tipo string');
    }
  }
}

export class CreateUserUseCaseValidator
  implements ValidatorStrategyInterface<CreateUserInputInterface>
{
  strategies: ValidatorStrategyInterface<CreateUserInputInterface>[] = [];

  constructor() {
    this.strategies = [new NameValidation(), new EmailValidation()];
  }

  validate(input: any): void {
    for (const strategy of this.strategies) {
      strategy.validate(input);
    }
  }
}
