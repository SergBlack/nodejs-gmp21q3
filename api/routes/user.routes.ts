import express from 'express';

import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from '../../controllers/user.controller';
import { userIdSchema, userSchema, userValidator } from '../middlewares/userValidator';

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(userValidator.body(userSchema), createUser);

router.route('/:id')
  .get(userValidator.params(userIdSchema), getUser)
  .put(userValidator.body(userSchema), updateUser)
  .delete(userValidator.params(userIdSchema), deleteUser);

export default router;
