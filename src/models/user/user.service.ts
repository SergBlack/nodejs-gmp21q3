import { IUser } from './user.interface';
import { UserRequestBodyType, UserRequestQueryType } from '@common/types/user';

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

    const data: IUser[] = this.userModel.findAll({
      where: {
        isDeleted: false,
      },
      ...queries,
    });

    return data;
  }

  create(body: UserRequestBodyType) {
    return this.userModel.create(body);
  }

  findById(userId: string) {
    return this.userModel.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
    });
  }

  delete(userId: string) {
    const user = this.findById(userId);

    if (user) {
      user.update({ isDeleted: true });
    }

    return user;
  }

  async update(userId: string, { password, age }: Partial<UserRequestBodyType>) {
    let props = {};

    if (password) {
      props = { password };
    }

    if (age) {
      props = { ...props, age };
    }

    const user = await this.findById(userId);

    if (user) {
      user.update(props);
    }

    return user;
  }
}
