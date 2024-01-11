import { AuthEntity, LoginEntity } from '../../domain/auth/authEntity';
import { UserEntity } from '../../domain/user/userEntity';
import { UserRepository } from '../../domain/user/userRepository';
import User from '../db/models/user';

export class UserRepositoryImpl implements UserRepository {
  async findByUsername(username: string): Promise<User> {
    return await User.findOne({
      where: {
        username,
      },
    });
  }

  async comparePassword(input: AuthEntity): Promise<LoginEntity> {
    const user = await User.findOne({
      where: {
        username: input.username,
      },
    });

    const passwordValid = await user.comparePassword(input.password);

    return {
      userId: user.id,
      passwordValid,
    };
  }

  async showAll(): Promise<UserEntity[]> {
    return await User.findAll();
  }
  async register(user: Partial<UserEntity>): Promise<UserEntity | null> {
    return await User.create({ ...user });
  }
}
