export interface UserModel {
  id: string;
  email: string;
  login: string;
  password: string;
  pictureUrl?: string | undefined;
}
