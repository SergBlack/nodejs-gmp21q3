export type RequestBodyType = {
  login: string;
  password: string;
  age: number;
}

export type RequestQueryType = {
  limit?: string;
  orderBy?: string;
  sortOrder?: string;
}
