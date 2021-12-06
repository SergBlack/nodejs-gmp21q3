import { Router } from 'express';

import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from '@models/user/user.controller';
import {
  userGetByIdSchema, userPostSchema, userUpdateSchema, userValidator,
} from '../middlewares/userValidator';

const router = Router();

router.route('/')
  .get(getUsers)
  .post(userValidator.body(userPostSchema), createUser);

router.route('/:id')
  .get(userValidator.params(userGetByIdSchema), getUser)
  .put(userValidator.params(userGetByIdSchema), userValidator.body(userUpdateSchema), updateUser)
  .delete(userValidator.params(userGetByIdSchema), deleteUser);

export default router;
