import { Router } from 'express';

import {
  getGroups,
  createGroup,
  getGroup,
  deleteGroup,
  updateGroup,
} from '@models/group/group.controller';
import {
  groupGetByIdSchema, groupSchema, groupValidator,
} from '../middlewares/groupValidator';
import { checkToken } from '@api/middlewares/checkToken';

const router = Router();

router.route('/')
  .get(getGroups)
  .post(checkToken, groupValidator.body(groupSchema), createGroup);

router.route('/:id')
  .get(groupValidator.params(groupGetByIdSchema), getGroup)
  .put(
    checkToken,
    groupValidator.params(groupGetByIdSchema),
    groupValidator.body(groupSchema),
    updateGroup,
  )
  .delete(checkToken, groupValidator.params(groupGetByIdSchema), deleteGroup);

export default router;
