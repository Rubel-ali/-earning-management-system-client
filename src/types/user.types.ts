export interface IUser {
  id: string;
  username: string;
  email: string;
  image: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface IUserResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IUser[];
}