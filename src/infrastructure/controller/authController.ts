import { NextFunction, Request, Response } from 'express';
import { AuthUseCase } from '../../application/authUseCase';
import User from '../db/models/user';
import jwt from 'jsonwebtoken';

export class AuthController {
  constructor(private readonly userUseCase: AuthUseCase) {}

  private _create = async (req: Request, res: Response, _: NextFunction) => {
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
  public get create() {
    return this._create;
  }
  public set create(value) {
    this._create = value;
  }
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
}
