import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { ApiError } from '@api/errors/apiError';
import { logger } from '@common/utils';
import { User } from '@models/index';

const config = require('../../../config.js');

const generateJwtToken = (userId: string) => {
  const payload = { userId };
  const jwtSecret = config.jwtSecret as string;
  const options = { expiresIn: '24h' };

  return jwt.sign(payload, jwtSecret, options);
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      where: {
        login,
      },
    });

    if (!user) {
      return next(ApiError.sendForbidden(`User ${login} not found`));
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return next(ApiError.sendForbidden('Authorization data entered incorrectly'));
    }

    const token = generateJwtToken(user.id);

    return res.json({ token });
  } catch (e) {
    logger.error(e);
    return next(ApiError.sendBadRequest());
  }
};
