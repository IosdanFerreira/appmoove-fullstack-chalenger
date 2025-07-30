import { BadRequestError } from 'src/shared/domain/errors/bad-request.error';
import { Email } from 'src/shared/domain/value-objects/email/email.value-object';
import { InvalidParamError } from 'src/shared/domain/errors/invalid-param.error';
import { Name } from 'src/shared/domain/value-objects/name/name.value-object';
import { UserEntityProps } from '../user.entity';
import { ValidatorStrategyInterface } from 'src/shared/domain/interfaces/validator-strategy.interface';

export class UserNameValidation
  implements ValidatorStrategyInterface<UserEntityProps>
{
  validate(userProps: UserEntityProps): void {
    if (!userProps.name) {
      throw new BadRequestError('Nome é obrigatório');
    }

    if (!(userProps.name instanceof Name)) {
      throw new BadRequestError('Nome deve ser uma instância de Name');
    }
  }
}

export class UserEmailValidation
  implements ValidatorStrategyInterface<UserEntityProps>
{
  validate(userProps: UserEntityProps): void {
    if (!userProps.email) {
      throw new BadRequestError('Email é obrigatório');
    }

    if (!(userProps.email instanceof Email)) {
      throw new BadRequestError('Email deve ser uma instância de Email');
    }
  }
}

export class CreateUserValidator {
  private strategies: ValidatorStrategyInterface<UserEntityProps>[];

  constructor() {
    this.strategies = [new UserNameValidation(), new UserEmailValidation()];
  }
  validate(userProps: UserEntityProps) {
    if (!userProps) {
      throw new InvalidParamError('userProps é obrigatório');
    }

    for (const strategy of this.strategies) {
      strategy.validate(userProps);
    }
  }
}
