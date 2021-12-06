import { Permission } from '@common/types/group';

export interface IGroup {
  id: string;
  name: string;
  permissions: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
}
