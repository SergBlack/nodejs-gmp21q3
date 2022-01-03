import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ApiError } from '@api/errors/apiError';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string;

  if (token) {
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        next();
      }
    });
  } else {
    next(ApiError.sendUnauthorized('No token provided.'));
  }
};
