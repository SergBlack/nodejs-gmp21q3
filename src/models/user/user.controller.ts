import { NextFunction, Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import User from './user.entity';
import UserService from './user.service';
import { UserRequestBodySchema, UserRequestParamsSchema } from '@api/middlewares/userValidator';
import { ApiError } from '@api/errors/apiError';
import { UserRequestQueryType } from '@common/types/user';
import { logger } from '@common/utils';

const userService = new UserService(User);

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await userService.getAll(req.query as UserRequestQueryType);

    res.json(allUsers);
  } catch (e) {
    logger.error(e);
    next(ApiError.sendBadRequest());
  }
};

export const createUser = async (
  req: ValidatedRequest<UserRequestBodySchema>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await userService.create(req.body);

    res.json(newUser);
  } catch (e) {
    logger.error(e);
    next(ApiError.sendBadRequest('User was not created'));
  }
};

export const getUser = async (
  req: ValidatedRequest<UserRequestParamsSchema>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const user = await userService.findById(id);

    if (!user) {
      next(ApiError.sendBadRequest('User was not found in the database'));
      return;
    }

    res.json(user);
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const updateUser = async (
  req: ValidatedRequest<UserRequestBodySchema>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const user = await userService.update(id, req.body);

    if (!user) {
      next(ApiError.sendBadRequest('User was not found in the database'));
      return;
    }

    res.json(user);
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const deleteUser = async (
  req: ValidatedRequest<UserRequestParamsSchema>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const user = await userService.delete(id);

    if (!user) {
      next(ApiError.sendBadRequest('User was not found in the database'));
      return;
    }

    res.json({ message: 'User deleted successfully' });
  } catch (e) {
    logger.error(e);
    next(e);
  }
};
