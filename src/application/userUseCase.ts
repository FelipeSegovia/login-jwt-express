import { UserEntity } from '../domain/user/userEntity';
import { UserRepository } from '../domain/user/userRepository';

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public register = async (user: Partial<UserEntity>) => {
    return this.userRepository.register(user);
  };

  public showAll = async (): Promise<UserEntity[] | null> => {
    return this.userRepository.showAll();
  };
}
