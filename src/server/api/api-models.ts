export interface JsonModel {
  users: UserModel[];
}
export interface UserModel {
  id: string;
  email: string;
  login: string;
  password: string;
  createdAt: number;
  pictureUrl: string | null;
}
