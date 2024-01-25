import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

type User = {
  id: number;
  email: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      dataUser: User;
    }
  }
}
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.header('Authorization'));
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(400).send('Token not found');
    }

    const verifiedToken = verify(token, 'budi123');
    if (!verifiedToken) {
      return res.status(401).send('Unauthorize Token');
    }

    req.dataUser = verifiedToken as User;
    next();
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
