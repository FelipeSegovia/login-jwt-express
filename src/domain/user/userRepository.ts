import { UserEntity } from './userEntity';

export interface UserRepository {
  register(user: Partial<UserEntity>): Promise<UserEntity | null>;
  showAll(): Promise<UserEntity[] | null>;
}
