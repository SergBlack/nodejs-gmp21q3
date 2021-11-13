import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { db } from '../models';
import { UserRequestBodySchema, UserRequestParamsSchema } from '../api/middlewares/userValidator';
import UserService from '../services/user';
import { RequestQueriesType } from '../types';

const userService = new UserService(db.User);

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.getAll(req.query as RequestQueriesType);

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

  try {
    const user = await userService.update(id, req.body);

    if (!user) {
      return res.status(400).json({ error: 'User was not found in the database' });
    }

    return res.json({ message: 'User updated successfully' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
};
