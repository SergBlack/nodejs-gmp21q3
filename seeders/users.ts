import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../types';

export const users: IUser[] = [
  {
    id: uuidv4(),
    login: 'Dan Test',
    password: 'user1Password',
    age: 21,
    isDeleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'Nik Test',
    password: 'user2Password',
    age: 45,
    isDeleted: false,
    createdAt: new Date().toISOString(),
  },
];
