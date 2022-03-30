import { number } from "yup";

export interface JsonModel {
  users: UserModel[];
}
export interface UserModel {
  id: number;
  email?: string;
  login?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  newPassword?: string;
  createdAt?: number;
  pictureUrl?: string | null;
  currency?: number;
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
  disableUserDates?: object;
  disableUsersDates?: number[];
  dates?: number[][];
  price?: string;
  owner?: object;
  reviews?: object[];
}
