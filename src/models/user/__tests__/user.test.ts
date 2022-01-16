import request from 'supertest';

import app from '../../../../app';
import UserService from '@models/user/user.service';
import User from '@models/user/user.entity';

const testUserCredentials = {
  login: 'NewUser4Login',
  password: 'NewUser4Password',
};

const login = 'mockUserLogin';
const password = 'mockUserPass123';
const age = 20;
let token = '';

const userMock = {
  login,
  password,
  age,
};

const userService = new UserService(User);

describe('/users', () => {
  beforeAll(async () => {
    const res = await request(app)
      .post('/auth')
      .send(testUserCredentials);

    token = res.body.token;
  });

  test('should respond with users', async () => {
    UserService.prototype.getAll = jest.fn().mockResolvedValue(userMock);

    const res = await request(app).get('/users');

    expect(res.body).toStrictEqual(userMock);
  });

  test('should save user to the database', async () => {
    UserService.prototype.create = jest.fn().mockResolvedValue(userMock);

    const res = await request(app)
      .post('/users')
      .set({ Authorization: `Bearer ${token}` })
      .send(userMock);

    expect(res.statusCode).toBe(200);
    expect(userService.create).toHaveBeenCalled();
  });

  test('response has user id', async () => {
    UserService.prototype.create = jest.fn().mockResolvedValue({ id: 'uniqId', ...userMock });

    const res = await request(app)
      .post('/users')
      .set({ Authorization: `Bearer ${token}` })
      .send(userMock);

    expect(res.body.id).toBeDefined();
  });

  test('should respond with a status code of 400', async () => {
    const badUser = {
      ...userMock,
      password: 'wnd2d',
    };

    const res = await request(app)
      .post('/users')
      .set({ Authorization: `Bearer ${token}` })
      .send(badUser);

    expect(res.statusCode).toBe(400);
  });
});
