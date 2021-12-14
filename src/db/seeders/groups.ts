import { IGroup } from '@models/group/group.interface';

export const groups: IGroup[] = [
  {
    id: '9cab7b44-6a1e-4946-a294-1c6e487bc17f',
    name: 'admins',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
  },
  {
    id: '37f86650-6dce-4f50-950a-3f46c5073307',
    name: 'users',
    permissions: ['READ', 'SHARE'],
  },
  {
    id: '075ef580-b2ef-424a-a660-9bdec5f941bb',
    name: 'moderators',
    permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES'],
  },
];
