// verifyToken.ts
import { Role, User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const verifyTokenTest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verify(token, 'budi123');
    req.dataUser = decoded as User;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

// Sample middleware function to check role
export default function checkRole(requiredRole: Role) {
  return (req: any, res: any, next: any) => {
    const user: User = req.user; // Assuming user is attached to request object after authentication
    if (user && user.role === requiredRole) {
      next(); // User has required role, proceed to the next middleware or route handler
    } else {
      res.status(403).send('Forbidden'); // User does not have required role
    }
  };
}
