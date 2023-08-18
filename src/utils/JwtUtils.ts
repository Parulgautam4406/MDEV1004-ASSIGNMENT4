// jwtUtils.ts
import jwt from 'jsonwebtoken';
import { Request as ExpressRequest, Response, NextFunction } from 'express';

const SECRET_KEY = 'your-secret-key'; // Replace with a strong secret key
const EXPIRATION_TIME = '1h';

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET_KEY);
};

declare global {
  namespace Express {
    interface Request {
      user: any; // Replace 'any' with the actual user type if available
    }
  }
}

export const authenticateToken = (req: ExpressRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};