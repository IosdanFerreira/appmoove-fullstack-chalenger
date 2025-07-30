import { InputSearchInterface } from 'src/shared/application/interfaces/input-search.interface';
import { UserEntity } from '../entities/user.entity';

export interface UserRepositoryInterface {
  create(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findAll(input: InputSearchInterface): Promise<UserEntity[]>;
  count(search?: string): Promise<number>;
}
