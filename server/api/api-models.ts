export interface JsonModel {
  users: UserModel[];
}
export interface UserModel {
  id: string;
  email: string;
  login: string;
  password: string;
  pictureUrl?: string | null;
}
