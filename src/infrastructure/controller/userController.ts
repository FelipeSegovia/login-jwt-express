import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserUseCase } from '../../application/userUseCase';
import User from '../db/models/user';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  public create = async (req: Request, res: Response, _: NextFunction) => {
    try {
      //TODO: mover esta logica a un useUseCase
      const hashedPassword = await User.encryptPassword(req.body.password);
      const newUser = await this.userUseCase.register({
        ...req.body,
        password: hashedPassword,
      });

      const token: string = jwt.sign(
        { id: newUser?.id },
        process.env.SECRET_JWT || ''
      );

      res
        .send({
          name: newUser.username,
          email: newUser.email,
          password: hashedPassword,
          token: token,
        })
        .status(201);
    } catch (errr) {
      res.status(404).send('Recurso no disponible');
    }
  };
  public login = async (req: Request, res: Response, _: NextFunction) => {
    const { username, password: passwordInput } = req.body;

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user && (await user.comparePassword(passwordInput))) {
      const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_JWT || '',
        { expiresIn: '1h' }
      );

      res.json({ token });
    } else {
      res
        .status(401)
        .json({ message: 'Nombre de usuario o contraseña incorrectos.' });
    }
  };

  public showAll = async (req: Request, res: Response, _: NextFunction) => {
    try {
      res.status(200).send(await this.userUseCase.showAll());
    } catch (errr) {
      res.status(404).send('Recurso no disponible');
    }
  };
}
