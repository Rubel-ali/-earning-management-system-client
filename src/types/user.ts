export interface IUser {
  userId: string;
  userName: string;
  email: string;
  profileImage?: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}
