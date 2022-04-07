export interface JsonModel {
  users: UserModel[];
  hotels: HotelModel[];
  currency: CurrencyModel[];
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
  currencyId?: number;
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

export interface IRegister {
  promise?: object;
  onRegister: (
    email: string,
    login: string,
    firstName: string,
    lastName: string,
    password: string
  ) => void;
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
  promise?: object;
  onLogin: (email: string, password: string) => void;
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
  type: string;
  signInOpenState?: (value: boolean) => void;
  signUpOpenState?: (value: boolean) => void;
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

export interface IProfile {
  auth: object;
  promise: object;
  actionLogOut: () => object;
  signed?: boolean;
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
}

export interface IDisableUserDates {
  formattedDateArrival: number;
  formattedDateDeparture: number;
  currentHotel: HotelModel;
  auth: object;
  values: HotelPageFormValues;
  disableUserDates: object;
}

export interface IDisableUsersDates {
  currentHotel: HotelModel;
  values: HotelPageFormValues;
  disableUsersDates: number[];
}

export interface IFreeRooms {
  formattedDateArrival: number;
  formattedDateDeparture: number;
  freeRooms: object;
  currentHotel: HotelModel;
  values: HotelPageFormValues;
  auth: object;
}

export interface PersonalDataValues {
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
}
