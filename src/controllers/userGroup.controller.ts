import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { db } from '../models';
import { UserGroupRequestBodySchema } from '../api/middlewares/userGroupValidator';
import UserGroupService from '../services/userGroup.service';

const userGroupService = new UserGroupService(db.UserGroup);

export const addUsersToGroup = async (
  req: ValidatedRequest<UserGroupRequestBodySchema>,
  res: Response,
) => {
  try {
    await userGroupService.addUsersToGroup(req.body);

    return res.json({ message: 'Users added successfully' });
  } catch (e: any) {
    if (e?.parent?.detail) {
      return res.status(400).json({ error: e?.parent?.detail });
    }

    return res.status(500).json({ error: 'Server error' });
  }
};
