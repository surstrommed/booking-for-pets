import React from "react";
import { RootState } from "../../helpers/types";

export interface JsonModel {
  users: UserModel[];
  hotels: HotelModel[];
  currency: CurrencyModel[];
  notifications: NotificationModel[];
}

export interface WishlistModel {
  name: string;
  hotelsId: string[];
}

export interface Wishlists {
  name: string;
  hotelsId: number[];
}
export interface UserModel {
  id?: number;
  email?: string;
  login?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  createdAt?: number;
  pictureUrl?: string | null;
  currencyId?: number;
  notifications?: NotificationModel[];
  wishlists?: WishlistModel[];
}

export interface HotelModel {
  id: string;
  name?: string;
  location?: string;
  address?: string;
  description?: string;
  photos?: string[];
  hotelRooms?: number;
  freeRooms?: FreeRoomsModel;
  userRequests?: UserRequestModel[];
  disableUserDates?: object;
  disableUsersDates?: number[];
  dates?: number[][];
  price?: number;
  owner?: number;
  reviews?: object[];
}

export interface CurrencyModel {
  id: number;
  name?: string;
  sign?: string;
}

export interface NotificationModel {
  id: string;
  text?: string;
  status?: string;
  fromId?: number | null;
  toId?: number;
}

export interface FreeRoomsModel {
  [date: string]: {
    availableSeats: number;
    usersId: number[];
    usersAnimalsCount: number[];
  };
}

export interface UserRequestModel {
  arrivalDate: Date;
  departureDate: Date;
  animalsNumber: number;
  usersId: number;
  message: string;
  status: string;
  id: string;
}

export interface IRegister {
  modal?: boolean;
  signInOpenState?: (value: boolean) => void;
  signUpOpenState?: (value: boolean) => void;
}

export interface RegisterFormValues {
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  retryPassword: string;
}

export interface ILogin {
  modal?: boolean;
  signInOpenState?: (value: boolean) => void;
  signUpOpenState?: (value: boolean) => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface IModal {
  title: string;
  body: string | React.ReactElement;
  type?: string;
  signInOpenState?: (value: boolean) => void;
  signUpOpenState?: (value: boolean) => void;
  modalWindowState?: (value: boolean) => void;
}

export interface IPreloader {
  promiseName: string;
  promiseState: object;
  sub: React.ReactElement | string | number;
  modal?: boolean;
}

export interface ElevationScrollProps {
  window?: () => Window;
  children: React.ReactElement;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface HotelPageFormValues {
  dateArrival: Date | null;
  dateDeparture: Date | null;
  numberAnimals: number;
  message: string;
}

export interface IDisableUserDates {
  formattedDateArrival: number;
  formattedDateDeparture: number;
  currentHotel: HotelModel;
  userId: number;
  numberAnimals: number;
  disableUserDates: object;
}

export interface IDisableUsersDates {
  currentHotel: HotelModel;
  numberAnimals: number;
  disableUsersDates: number[];
}

export interface IFreeRooms {
  formattedDateArrival: number;
  formattedDateDeparture: number;
  freeRooms: object;
  currentHotel: HotelModel;
  numberAnimals: number;
  userId: number;
}

export interface PersonalDataValues {
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface EditingHotelDataValues {
  name: string;
  location: string;
  address: string;
  description: string;
  hotelRooms: number;
  price: number;
  // photos: string[];
}

export interface IOwner {
  id: string;
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  pictureUrl: string | null;
}

export interface IReview {
  id: string;
  rating?: number;
  text?: string;
  createdAt?: Date;
  owner: IOwner;
}
