import { AuthEntity } from '../domain/auth/authEntity';
import { UserEntity } from '../domain/user/userEntity';
import { UserRepository } from '../domain/user/userRepository';
import jwt from 'jsonwebtoken';

export class AuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public register = async (user: Partial<UserEntity>) => {
    return this.userRepository.register(user);
  };

  public login = async (input: AuthEntity) => {
    const user = await this.userRepository.comparePassword(input);

    if (user && user.passwordValid) {
      const token = jwt.sign(
        { userId: user.userId },
        process.env.SECRET_JWT || '',
        { expiresIn: '1h' }
      );

      return token;
    }

    return null;
  };
}
