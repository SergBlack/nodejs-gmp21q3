import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import User from '../models/user';
import UserService from '../services/user.service';
import { UserRequestBodySchema, UserRequestParamsSchema } from '../api/middlewares/userValidator';
import { UserRequestQueryType } from '../types/user';

const userService = new UserService(User);

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.getAll(req.query as UserRequestQueryType);

    return res.json(allUsers);
  } catch (e) {
    return res.status(400).json({ error: 'Bad request' });
  }
};

export const createUser = async (req: ValidatedRequest<UserRequestBodySchema>, res: Response) => {
  try {
    const newUser = await userService.create(req.body);

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

export const updateUser = async (req: ValidatedRequest<UserRequestBodySchema>, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.update(id, req.body);

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

    if (user) {
      return res.json({ message: 'User deleted successfully' });
    }

    return res.status(400).json({ error: 'User was not found in the database' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
};
