import { AuthEntity, LoginEntity } from '../auth/authEntity';
import { UserEntity } from './userEntity';

export interface UserRepository {
  register(user: Partial<UserEntity>): Promise<UserEntity | null>;
  showAll(): Promise<UserEntity[] | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  comparePassword(input: AuthEntity): Promise<LoginEntity>;
}
