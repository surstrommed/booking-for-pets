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

export interface HotelModel {
  id: number;
  name?: string;
  location?: string;
  address?: string;
  description?: string;
  photos?: string[];
  hotelRooms?: number;
  freeRooms?: object;
  dates?: number[][];
  price?: string;
  owner?: object;
  reviews?: object[];
}
