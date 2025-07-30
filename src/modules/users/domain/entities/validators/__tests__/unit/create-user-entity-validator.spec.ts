import {
  CreateUserValidator,
  UserEmailValidation,
  UserNameValidation,
} from '../../create-user-entity.validator';

import { Email } from 'src/shared/domain/value-objects/email/email.value-object';
import { InvalidParamError } from 'src/shared/domain/errors/invalid-param.error';
import { Name } from 'src/shared/domain/value-objects/name/name.value-object';
import { UserEntityProps } from '../../../user.entity';

describe('CreateUserValidator unit tests', () => {
  describe('UserNameValidation', () => {
    let validator: UserNameValidation;

    beforeEach(() => {
      validator = new UserNameValidation();
    });

    it('deve lançar erro se o nome não existir', () => {
      const props = {} as UserEntityProps;

      expect(() => validator.validate(props)).toThrow(InvalidParamError);
    });

    it('deve lançar erro se o nome não for uma instância de Name', () => {
      const props = { name: 'not-a-name-object' } as unknown as UserEntityProps;

      expect(() => validator.validate(props)).toThrow(InvalidParamError);
    });

    it('deve passar se o nome for uma instância de Name', () => {
      const name = Name.create('José Silva');
      const props = { name } as UserEntityProps;

      expect(() => validator.validate(props)).not.toThrow();
    });
  });

  describe('UserEmailValidation', () => {
    let validator: UserEmailValidation;

    beforeEach(() => {
      validator = new UserEmailValidation();
    });

    it('deve lançar erro se o email não existir', () => {
      const props = {} as UserEntityProps;

      expect(() => validator.validate(props)).toThrow(InvalidParamError);
    });

    it('deve lançar erro se o email não for uma instância de Email', () => {
      const props = {
        email: 'not-an-email-object',
      } as unknown as UserEntityProps;

      expect(() => validator.validate(props)).toThrow(InvalidParamError);
    });

    it('deve passar se o email for uma instância de Email', () => {
      const email = Email.create('user@example.com');
      const props = { email } as UserEntityProps;

      expect(() => validator.validate(props)).not.toThrow();
    });
  });

  describe('CreateUserValidator', () => {
    let validator: CreateUserValidator;
    let validProps: UserEntityProps;

    beforeEach(() => {
      validator = new CreateUserValidator();

      validProps = {
        name: Name.create('Maria Joaquina'),
        email: Email.create('maria@example.com'),
        createdAt: new Date(),
      };
    });

    it('deve lançar erro se userProps for indefinido', () => {
      expect(() => validator.validate(undefined as any)).toThrow(
        InvalidParamError,
      );
    });

    it('deve passar se todas as validações forem bem-sucedidas', () => {
      expect(() => validator.validate(validProps)).not.toThrow();
    });

    it('deve lançar erro se o nome for inválido', () => {
      const invalidProps = {
        ...validProps,
        name: 'not-a-name',
      } as unknown as UserEntityProps;

      expect(() => validator.validate(invalidProps)).toThrow(InvalidParamError);
    });

    it('deve lançar erro se o email for inválido', () => {
      const invalidProps = {
        ...validProps,
        email: 'not-an-email',
      } as unknown as UserEntityProps;

      expect(() => validator.validate(invalidProps)).toThrow(InvalidParamError);
    });
  });
});
