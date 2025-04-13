import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorize = (requiredRoles: string[]) => async (req: any , res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id).populate('roles');
    const userRoles = user?.roles || [];

    const hasRole = userRoles.some((role: any) => requiredRoles.includes(role.name));
    if (!hasRole) return res.status(403).json({ error: 'Forbidden' });

    next();
  } catch (error) {
    res.status(500).json({ error: 'Authorization error' });
  }
};


