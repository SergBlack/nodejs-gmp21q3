import sequelize from './config';
import { users } from './seeders/users';
import { groups } from './seeders/groups';
import { userGroups } from './seeders/userGroups';
import { Group, User, UserGroup } from '../models';

const initDb = async () => sequelize.sync();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createEntities = () => {
  users.forEach(user => {
    User.create(user);
  });
  groups.forEach(group => {
    Group.create(group);
  });
  userGroups.forEach(userGroup => {
    UserGroup.create(userGroup);
  });
};

// createEntities();

export default initDb;
