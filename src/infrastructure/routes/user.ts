import { Router } from 'express';
import { authMiddleWare } from '../../middleware/authMiddleware';
import { UserRepositoryImpl } from '../repositories/userRepository';
import { UserUseCase } from '../../application/userUseCase';
import { UserController } from '../controller/userController';

const router: Router = Router();

const userRepo = new UserRepositoryImpl();

const userUseCase = new UserUseCase(userRepo);

const userController = new UserController(userUseCase);

router.get('/users', authMiddleWare, userController.showAll);

export default router;
