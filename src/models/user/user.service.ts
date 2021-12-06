import { IUser } from './user.interface';
import { UserRequestBodyType, UserRequestQueryType } from '@common/types/user';
import { Logger } from '@common/utils/logger';

export default class UserService {
  private userModel;

  constructor(userModel: any) {
    this.userModel = userModel;
  }

  getAll({ limit, orderBy, sortOrder }: UserRequestQueryType) {
    let queries = {};

    if (limit) {
      queries = { limit: Number(limit) };
    }

    if (orderBy) {
      const orderGroup = [orderBy];

      if (sortOrder) {
        orderGroup.push(sortOrder);
      }

      queries = { ...queries, order: [orderGroup] };
    }

    try {
      const data: IUser[] = this.userModel.findAll({
        where: {
          isDeleted: false,
        },
        ...queries,
      });

      return data;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  create(body: UserRequestBodyType) {
    try {
      return this.userModel.create(body);
    } catch (e) {
      Logger.error(e);
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
      Logger.error(e);
      throw e;
    }
  }

  async delete(userId: string) {
    try {
      const user = await this.findById(userId);

      if (user) {
        user.update({ isDeleted: true });
      }

      return user;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  async update(userId: string, { password, age }: Partial<UserRequestBodyType>) {
    let props = {};

    if (password) {
      props = { password };
    }

    if (age) {
      props = { ...props, age };
    }

    try {
      const user = await this.findById(userId);

      if (user) {
        user.update(props);
      }

      return user;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }
}
