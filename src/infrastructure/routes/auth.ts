import { UserUseCase } from '../../application/userUseCase';
import { Router } from 'express';
import { UserRepositoryImpl } from '../repositories/userRepository';
import { UserController } from '../controller/userController';
import {
  authMiddleWare,
  publicMiddleware,
} from '../../middleware/authMiddleware';

const router: Router = Router();

const userRepo = new UserRepositoryImpl();

const userUseCase = new UserUseCase(userRepo);

const userController = new UserController(userUseCase);

router.post('/signup', userController.create);

router.post('/signin', userController.login);

router.get('/users', authMiddleWare, userController.showAll);

export default router;
