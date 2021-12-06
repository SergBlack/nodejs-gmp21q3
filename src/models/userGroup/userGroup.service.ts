import sequelize from '@db/config';
import { UserGroupRequestBodyType } from '@common/types/userGroup';
import { Logger } from '@common/utils/logger';

export default class UserGroupService {
  private userGroupModel;

  constructor(userGroupModel: any) {
    this.userGroupModel = userGroupModel;
  }

  async addUsersToGroup({ groupId, userIds }: UserGroupRequestBodyType) {
    const transaction = await sequelize.transaction();

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const UserId of userIds) {
        // eslint-disable-next-line no-await-in-loop
        await this.userGroupModel.create({
          GroupId: groupId,
          UserId,
        }, { transaction });
      }

      Logger.log('success');
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }
}
