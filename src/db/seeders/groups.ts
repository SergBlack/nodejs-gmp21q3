import { v4 as uuidv4 } from 'uuid';
import { IGroup } from '../../interfaces/group';

export const groups: IGroup[] = [
  {
    id: uuidv4(),
    name: 'admins',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'users',
    permissions: ['READ', 'SHARE'],
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'moderators',
    permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES'],
    createdAt: new Date().toISOString(),
  },
];
