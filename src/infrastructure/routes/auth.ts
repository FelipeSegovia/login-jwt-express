import { Router } from 'express';
import { UserRepositoryImpl } from '../repositories/userRepository';
import { AuthController } from '../controller/authController';
import { AuthUseCase } from '../../application/authUseCase';

const router: Router = Router();

const userRepo = new UserRepositoryImpl();

const authUserCase = new AuthUseCase(userRepo);

const authController = new AuthController(authUserCase);

router.post('/signup', authController.create);

router.post('/signin', authController.login);

export default router;
