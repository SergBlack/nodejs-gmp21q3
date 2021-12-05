import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import Group from './group.entity';
import GroupService from './group.service';
import { GroupRequestBodySchema, GroupRequestParamsSchema } from '../../api/middlewares/groupValidator';
import { GroupRequestQueryType } from '../../common/types/group';

const groupService = new GroupService(Group);

export const getGroups = async (req: Request, res: Response) => {
  try {
    const allGroups = await groupService.getAll(req.query as GroupRequestQueryType);

    return res.json(allGroups);
  } catch (e) {
    return res.status(400).json({ error: 'Bad request' });
  }
};

export const createGroup = async (req: ValidatedRequest<GroupRequestBodySchema>, res: Response) => {
  try {
    const newGroup = await groupService.create(req.body);

    return res.json(newGroup);
  } catch (e) {
    return res.status(400).json({ error: 'Group already exists' });
  }
};

export const getGroup = async (req: ValidatedRequest<GroupRequestParamsSchema>, res: Response) => {
  const { id } = req.params;

  try {
    const group = await groupService.findById(id);

    if (group) {
      return res.json(group);
    }

    return res.status(400).json({ error: 'Group was not found in the database' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const updateGroup = async (req: ValidatedRequest<GroupRequestBodySchema>, res: Response) => {
  const { id } = req.params;

  try {
    const group = await groupService.update(id, req.body);

    if (group) {
      return res.json(group);
    }

    return res.status(400).json({ error: 'Group was not found in the database' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const deleteGroup = async (
  req: ValidatedRequest<GroupRequestParamsSchema>,
  res: Response,
) => {
  const { id } = req.params;

  try {
    const success = await groupService.delete(id);

    if (success) {
      return res.json({ message: 'Group deleted successfully' });
    }

    return res.status(400).json({ error: 'Group was not found in the database' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
};
