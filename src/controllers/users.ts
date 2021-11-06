import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

import { User } from '../types';
import { compare } from '../helpers/compare';

let users: User[] = [];

export const getUsers = (req: Request, res: Response) => {
  const LIMIT = 5;

  const allUsers = users
    .sort((firstUser, secondUser) => compare(firstUser.login, secondUser.login))
    .filter((user, index) => !user.isDeleted && index < LIMIT);

  res.json(allUsers);
};

export const createUser = (req: Request, res: Response) => {
  const { login, password, age } = req.body;

  // add validation
  if (!login || !password || !age) {
    return res.status(400).json({ error: 'Request error' });
  }

  const userExists = users.find(user => user.login === login);

  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser: User = {
    login,
    password,
    age,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    isDeleted: false,
  };

  users = [...users, newUser];

  return res.json(newUser);
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  const user = users.find(u => u.id === id);

  if (user && !user.isDeleted) {
    return res.send(user);
  }

  return res.status(400).json({ error: 'User was not found in the database' });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  let isSuccess = false;

  users = users.map(user => {
    if (user.id === id) {
      isSuccess = true;
      return { ...user, isDeleted: true };
    }

    return user;
  });

  if (isSuccess) {
    return res.json({ message: 'User has been deleted' });
  }

  return res.status(400).json({ error: 'User was not found in the database' });
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  let isSuccess = false;

  users = users.map(user => {
    if (user.id === id) {
      isSuccess = true;
      return { ...user, ...req.body };
    }

    return user;
  });

  if (isSuccess) {
    return res.json({ message: 'User has been updated' });
  }

  return res.status(400).json({ error: 'User was not found in the database' });
};
