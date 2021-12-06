import { Router } from 'express';

import { addUsersToGroup } from '@models/userGroup/userGroup.controller';
import { userGroupSchema, userGroupValidator } from '../middlewares/userGroupValidator';

const router = Router();

router.route('/')
  .post(userGroupValidator.body(userGroupSchema), addUsersToGroup);

export default router;
