import { CreateUserValidator } from './validators/create-user-entity.validator';
import { Email } from 'src/shared/domain/value-objects/email/email.value-object';
import { Entity } from 'src/shared/domain/entities/entity';
import { Name } from 'src/shared/domain/value-objects/name/name.value-object';

export type UserEntityProps = {
  name: Name;
  email: Email;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserEntityProps> {
  private constructor(props: UserEntityProps, id?: string) {
    super(id, props);
  }

  public static create(props: UserEntityProps, id?: string): UserEntity {
    const validator = new CreateUserValidator();
    validator.validate(props);

    return new UserEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  private set name(newName: Name) {
    this.props.name = newName;
  }

  private set email(newEmail: Email) {
    this.props.email = newEmail;
  }

  public get name(): string {
    return this.props.name.value;
  }

  public get email(): string {
    return this.props.email.value;
  }

  public get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  }
}
