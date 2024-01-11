import { UserEntity } from '../../domain/user/userEntity';
import { UserRepository } from '../../domain/user/userRepository';
import User from '../db/models/user';

export class UserRepositoryImpl implements UserRepository {
  async showAll(): Promise<UserEntity[]> {
    return await User.findAll();
  }
  async register(user: Partial<UserEntity>): Promise<UserEntity | null> {
    return await User.create({ ...user });
  }
}
