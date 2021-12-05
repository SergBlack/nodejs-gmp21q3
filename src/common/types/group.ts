export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type GroupRequestQueryType = {
  limit?: string;
  orderBy?: string;
  sortOrder?: string;
}

export type GroupRequestBodyType = {
  name: string;
  permissions: Permission[];
}
