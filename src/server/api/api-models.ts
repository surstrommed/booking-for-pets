export interface JsonModel {
  users: UserModel[];
}
export interface UserModel {
  id: number;
  email?: string;
  login?: string;
  password?: string;
  newPassword?: string;
  createdAt?: number;
  pictureUrl?: string | null;
}
