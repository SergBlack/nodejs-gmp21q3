import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ApiError } from '@api/errors/apiError';

const config = require('../../../config.js');

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  const jwtSecret = config.jwtSecret as string;

  if (token) {
    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate' });
      } else {
        next();
      }
    });
  } else {
    next(ApiError.sendUnauthorized('User is not authorized.'));
  }
};
