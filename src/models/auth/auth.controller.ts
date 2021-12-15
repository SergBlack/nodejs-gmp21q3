import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ApiError } from '@api/errors/apiError';
import { logger } from '@common/utils';
import User from '../user/user.entity';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      where: {
        login,
      },
    });

    if (!user || password !== user.password) {
      return ApiError.sendForbidden('Authorization data entered incorrectly');
    }

    const token = jwt.sign({ userId: user.id }, 'jwtSecret', { expiresIn: 10 });

    return res.json({ token });
  } catch (e) {
    logger.error(e);
    return next(ApiError.sendBadRequest());
  }
};
