import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = null;

  const includeBeared = req.header('Authorization').includes('Bearer ');

  if (includeBeared) {
    token = req.header('Authorization').split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
    console.log(decodedToken);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido.' });
  }
};
