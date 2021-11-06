import express from 'express';

import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/users';
import { userSchema, userValidator } from '../middlewares/userValidator';

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(userValidator.body(userSchema), createUser);

router.route('/:id')
  .get(getUser)
  .put(userValidator.body(userSchema), updateUser)
  .delete(deleteUser);

export default router;
