import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { db } from '../models';
import { UserRequestBodySchema, UserRequestParamsSchema } from '../api/middlewares/userValidator';
import UserService from '../services/user';

const userService = new UserService(db.User);

export const getUsers = async (req: Request, res: Response) => {
  const LIMIT = 5;

  const allUsers = await userService.getAll(LIMIT);

  res.json(allUsers);
};

export const createUser = async (req: ValidatedRequest<UserRequestBodySchema>, res: Response) => {
  const { login, password, age } = req.body;

  try {
    const newUser = await userService.create(login, password, age);

    return res.json(newUser);
  } catch (e) {
    return res.status(400).json({ error: 'User already exists' });
  }
};

export const getUser = async (req: ValidatedRequest<UserRequestParamsSchema>, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.findById(id);

    if (user) {
      return res.json(user);
    }

    return res.status(400).json({ error: 'User was not found in the database' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUser = async (req: ValidatedRequest<UserRequestParamsSchema>, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.delete(id);

    if (!user) {
      return res.status(400).json({ error: 'User was not found in the database' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const updateUser = async (req: ValidatedRequest<UserRequestBodySchema>, res: Response) => {
  const { id } = req.params;
  const { password, age } = req.body;

  try {
    const user = await userService.update(id, password, age);

    if (!user) {
      return res.status(400).json({ error: 'User was not found in the database' });
    }

    return res.json({ message: 'User updated successfully' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
};
