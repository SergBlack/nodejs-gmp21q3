import { IUser } from '../types';

export default class UserService {
  private userModel;

  constructor(userModel: any) {
    this.userModel = userModel;
  }

  getAll(limit: number) {
    try {
      const data: IUser[] = this.userModel.findAll({
        where: {
          isDeleted: false,
        },
        limit,
        order: [
          ['login', 'ASC'],
        ],
      });

      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  create(login: string, password: string, age: number) {
    try {
      return this.userModel.create({
        login,
        password,
        age,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  findById(userId: string) {
    try {
      return this.userModel.findOne({
        where: {
          id: userId,
          isDeleted: false,
        },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async delete(userId: string) {
    try {
      const user = await this.findById(userId);

      if (user) {
        user.update(
          { isDeleted: true },
          {
            where: {
              id: userId,
              isDeleted: false,
            },
          },
        );
      }

      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async update(userId: string, password?: string, age?: number) {
    try {
      const user = await this.findById(userId);

      if (user) {
        this.userModel.update(
          {
            password,
            age,
          },
          {
            where: {
              id: userId,
            },
          },
        );
      }

      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
