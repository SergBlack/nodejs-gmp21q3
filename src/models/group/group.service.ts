import { IGroup } from './group.interface';
import { GroupRequestBodyType, GroupRequestQueryType } from '@common/types/group';

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

    const data: IGroup[] = this.groupModel.findAll(queries);

    return data;
  }

  create(body: GroupRequestBodyType) {
    return this.groupModel.create(body);
  }

  findById(groupId: string) {
    return this.groupModel.findOne({
      where: { id: groupId },
    });
  }

  async delete(groupId: string) {
    return this.groupModel.destroy({
      where: { id: groupId },
    });
  }

  async update(groupId: string, { name, permissions }: Partial<GroupRequestBodyType>) {
    let props = {};

    if (name) {
      props = { name };
    }

    if (permissions?.length) {
      props = { ...props, permissions };
    }

    const group = await this.findById(groupId);

    if (group) {
      group.update(props);
    }

    return group;
  }
}
