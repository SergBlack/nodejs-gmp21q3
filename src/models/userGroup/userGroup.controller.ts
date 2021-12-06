import { NextFunction, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import UserGroup from './userGroup.entity';
import UserGroupService from './userGroup.service';
import { UserGroupRequestBodySchema } from '@api/middlewares/userGroupValidator';
import { ApiError } from '@api/errors/apiError';
import { logger } from '@common/utils';

const userGroupService = new UserGroupService(UserGroup);

export const addUsersToGroup = async (
  req: ValidatedRequest<UserGroupRequestBodySchema>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userGroupService.addUsersToGroup(req.body);

    res.json({ message: 'Users added successfully' });
  } catch (e: any) {
    if (e?.parent?.detail) {
      next(ApiError.sendBadRequest(e?.parent?.detail));
    }

    logger.error(e);
    next(e);
  }
};
