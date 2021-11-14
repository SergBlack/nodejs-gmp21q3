import { IGroup } from '../interfaces/group';
import { GroupRequestBodyType, GroupRequestQueryType } from '../types/group';

export default class GroupService {
  private groupModel;

  constructor(groupModel: any) {
    this.groupModel = groupModel;
  }

  getAll({ limit, orderBy, sortOrder }: GroupRequestQueryType) {
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
      const data: IGroup[] = this.groupModel.findAll(queries);

      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  create(body: GroupRequestBodyType) {
    try {
      return this.groupModel.create(body);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  findById(groupId: string) {
    try {
      return this.groupModel.findOne({
        where: { id: groupId },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async delete(groupId: string) {
    try {
      const result = await this.groupModel.destroy({
        where: { id: groupId },
      });

      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async update(groupId: string, { name, permissions }: Partial<GroupRequestBodyType>) {
    let props = {};

    if (name) {
      props = { name };
    }

    if (permissions?.length) {
      props = { ...props, permissions };
    }

    try {
      const group = await this.findById(groupId);

      console.log(group);

      if (group) {
        group.update(props);
      }

      return group;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
