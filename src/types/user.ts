export type UserRequestBodyType = {
  login: string;
  password: string;
  age: number;
}

export type UserRequestQueryType = {
  limit?: string;
  orderBy?: string;
  sortOrder?: string;
}
