import { IUser } from '@models/user/user.interface';

export const users: IUser[] = [
  {
    id: '02cd3548-274b-4ef1-a281-ad8c9ff449cc',
    login: 'DanTest',
    password: 'user1Password',
    age: 21,
    isDeleted: false,
  },
  {
    id: '75cad8d6-f03d-4420-bb24-4816c6fa51e1',
    login: 'NikTest',
    password: 'user2Password',
    age: 45,
    isDeleted: false,
  },
  {
    id: '4747b817-99f7-4ae7-b250-7153ff2132dd',
    login: 'LkeTest',
    password: 'user3Password',
    age: 77,
    isDeleted: true,
  },
  {
    id: '4c1b7115-a16e-4ce9-9a31-e632fccdedfe',
    login: 'ABC',
    password: 'ABCPassword',
    age: 21,
    isDeleted: false,
  },
  {
    id: '551d444c-d5cb-4d3c-9436-6a0a9cf96fd0',
    login: 'CDE',
    password: 'CDEPassword',
    age: 22,
    isDeleted: false,
  },
  {
    id: '5ecbfad2-bffb-4adb-a084-02029d58d868',
    login: 'XYZ',
    password: 'XYZPassword',
    age: 23,
    isDeleted: false,
  },
];
