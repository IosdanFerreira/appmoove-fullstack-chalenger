import { UserEntity, UserEntityProps } from '../../user.entity';

import { Email } from 'src/shared/domain/value-objects/email/email.value-object';
import { InvalidParamError } from 'src/shared/domain/errors/invalid-param.error';
import { Name } from 'src/shared/domain/value-objects/name/name.value-object';

describe('UserEntity unit tests', () => {
  let validProps: UserEntityProps;

  beforeEach(() => {
    validProps = {
      name: Name.create('Maria Silva'),
      email: Email.create('maria@example.com'),
      createdAt: new Date('2023-01-01T00:00:00Z'),
    };
  });

  it('deve criar uma entidade UserEntity com dados válidos', () => {
    const user = UserEntity.create(validProps);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.name).toBe('Maria Silva');
    expect(user.email).toBe('maria@example.com');
    expect(user.createdAt.toISOString()).toBe('2023-01-01T00:00:00.000Z');
    expect(typeof user.id).toBe('string');
  });

  it('deve gerar createdAt automático se não fornecido', () => {
    const propsWithoutDate = { ...validProps, createdAt: undefined };
    const user = UserEntity.create(propsWithoutDate);

    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('deve lançar erro ao tentar criar com dados inválidos', () => {
    // Forçar erro na validação passando um nome inválido (string simples)
    expect(() =>
      UserEntity.create({
        ...validProps,
        name: 'invalid-name' as any,
      }),
    ).toThrow(InvalidParamError);

    // Forçar erro passando email inválido
    expect(() =>
      UserEntity.create({
        ...validProps,
        email: 'invalid-email' as any,
      }),
    ).toThrow(InvalidParamError);
  });

  it('getters devem retornar valores corretos', () => {
    const user = UserEntity.create(validProps);

    expect(user.name).toBe(validProps.name.value);
    expect(user.email).toBe(validProps.email.value);
    expect(user.createdAt.getTime()).toBe(validProps.createdAt!.getTime());
  });

  it('toJSON deve retornar objeto com id, name, email e createdAt', () => {
    const user = UserEntity.create(validProps);

    const json = user.toJSON();

    expect(json).toMatchObject({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    expect(new Date(json.createdAt).getTime()).toBe(user.createdAt.getTime());
  });
});
