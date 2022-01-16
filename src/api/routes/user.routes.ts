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
import { checkToken } from '@api/middlewares/checkToken';

const router = Router();

router.route('/')
  .get(getUsers)
  .post(checkToken, userValidator.body(userPostSchema), createUser);

router.route('/:id')
  .get(userValidator.params(userGetByIdSchema), getUser)
  .put(
    checkToken,
    userValidator.params(userGetByIdSchema),
    userValidator.body(userUpdateSchema),
    updateUser,
  )
  .delete(checkToken, userValidator.params(userGetByIdSchema), deleteUser);

export default router;
