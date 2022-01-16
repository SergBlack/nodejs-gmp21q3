import { Router } from 'express';

import { addUsersToGroup } from '@models/userGroup/userGroup.controller';
import { userGroupSchema, userGroupValidator } from '../middlewares/userGroupValidator';
import { checkToken } from '@api/middlewares/checkToken';

const router = Router();

router.route('/')
  .post(checkToken, userGroupValidator.body(userGroupSchema), addUsersToGroup);

export default router;
