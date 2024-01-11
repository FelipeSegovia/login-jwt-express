import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserUseCase } from '../../application/userUseCase';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  public showAll = async (req: Request, res: Response, _: NextFunction) => {
    try {
      res.status(200).send(await this.userUseCase.showAll());
    } catch (errr) {
      res.status(404).send('Recurso no disponible');
    }
  };
}
