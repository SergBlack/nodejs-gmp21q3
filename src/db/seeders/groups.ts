import { v4 as uuidv4 } from 'uuid';
import { IGroup } from '@models/group/group.interface';

export const groups: IGroup[] = [
  {
    id: uuidv4(),
    name: 'admins',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
  },
  {
    id: uuidv4(),
    name: 'users',
    permissions: ['READ', 'SHARE'],
  },
  {
    id: uuidv4(),
    name: 'moderators',
    permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES'],
  },
];
