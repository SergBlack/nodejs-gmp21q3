import { Router } from 'express';

import {
  getGroups,
  createGroup,
  getGroup,
  deleteGroup,
  updateGroup,
} from '../../models/group/group.controller';
import {
  groupGetByIdSchema, groupSchema, groupValidator,
} from '../middlewares/groupValidator';

const router = Router();

router.route('/')
  .get(getGroups)
  .post(groupValidator.body(groupSchema), createGroup);

router.route('/:id')
  .get(groupValidator.params(groupGetByIdSchema), getGroup)
  .put(groupValidator.params(groupGetByIdSchema), groupValidator.body(groupSchema), updateGroup)
  .delete(groupValidator.params(groupGetByIdSchema), deleteGroup);

export default router;
