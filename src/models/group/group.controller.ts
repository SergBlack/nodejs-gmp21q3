import { NextFunction, Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import Group from './group.entity';
import GroupService from './group.service';
import { GroupRequestBodySchema, GroupRequestParamsSchema } from '@api/middlewares/groupValidator';
import { ApiError } from '@api/errors/apiError';
import { GroupRequestQueryType } from '@common/types/group';
import { logger } from '@common/utils';

const groupService = new GroupService(Group);

export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allGroups = await groupService.getAll(req.query as GroupRequestQueryType);

    res.json(allGroups);
  } catch (e) {
    logger.error(e);
    next(ApiError.sendBadRequest());
  }
};

export const createGroup = async (
  req: ValidatedRequest<GroupRequestBodySchema>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newGroup = await groupService.create(req.body);

    res.json(newGroup);
  } catch (e) {
    logger.error(e);
    next(ApiError.sendBadRequest('Group already exists'));
  }
};

export const getGroup = async (
  req: ValidatedRequest<GroupRequestParamsSchema>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const group = await groupService.findById(id);

    if (!group) {
      next(ApiError.sendBadRequest('Group was not found in the database'));
      return;
    }

    res.json(group);
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const updateGroup = async (
  req: ValidatedRequest<GroupRequestBodySchema>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const group = await groupService.update(id, req.body);

    if (!group) {
      next(ApiError.sendBadRequest('Group was not found in the database'));
      return;
    }

    res.json(group);
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const deleteGroup = async (
  req: ValidatedRequest<GroupRequestParamsSchema>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const success = await groupService.delete(id);

    if (!success) {
      next(ApiError.sendBadRequest('Group was not found in the database'));
      return;
    }

    res.json({ message: 'Group deleted successfully' });
  } catch (e) {
    logger.error(e);
    next(e);
  }
};
