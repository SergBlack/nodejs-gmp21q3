import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../types';

export const users: IUser[] = [
  {
    id: uuidv4(),
    login: 'DanTest',
    password: 'user1Password',
    age: 21,
    isDeleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'NikTest',
    password: 'user2Password',
    age: 45,
    isDeleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'LkeTest',
    password: 'user3Password',
    age: 77,
    isDeleted: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'ABC',
    password: 'ABCPassword',
    age: 21,
    isDeleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'CDE',
    password: 'CDEPassword',
    age: 22,
    isDeleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'XYZ',
    password: 'XYZPassword',
    age: 23,
    isDeleted: false,
    createdAt: new Date().toISOString(),
  },
];
