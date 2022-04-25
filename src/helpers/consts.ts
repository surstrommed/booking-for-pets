import { formatStringDate } from "./functions";

export const PENDING_PROMISE_STATUS = "PENDING";

export const RESOLVED_PROMISE_STATUS = "RESOLVED";

export const REJECTED_PROMISE_STATUS = "REJECTED";

export const PENDING_REQUEST_MESSAGE = "Pending";

export const CONFIRMED_REQUEST_MESSAGE = "Confirmed";

export const REJECTED_REQUEST_MESSAGE = "Rejected";

export const UNREAD_NOTIFICATION = "Unread";

export const READ_NOTIFICATION = "Read";

export const EMPTY_NOTIFICATION = "Empty";

export const DELETED_NOTIFICATION = "Deleted";

export const NOTIFICATION_MESSAGE_MODAL =
  "You can write the message you want to send to the user or leave the field blank and send";

export const ALREADY_EXIST_WISHLIST =
  "Wishlist with the same name already exists";

export const RENAME_ERROR_WISHLIST =
  "You cannot rename a wishlist to its current name";

export const DELETED_HOTEL = "You have deleted a hotel page";

export const CREATED_HOTEL = "You have created a hotel page";

export const EDIT_HOTEL = "You have edit a hotel page";

export const CONFIRMED_REQUEST_USER = "Your request has been confirmed";

export const REJECTED_REQUEST_USER = "Sorry, but your request was rejected";

export const CONFIRMED_REQUEST_OWNER =
  "You have successfully confirmed the request";

export const REJECTED_REQUEST_OWNER =
  "You have successfully rejected the request";

export const NEW_WISHLIST_MODAL_TITLE = "Name your new wishlist";

export const DEFAULT_CURRENCY_ID = 1;

export const MAX_ANIMALS = 10;

export const sendSnackBarMessages = {
  selectedCurrencyMessage: (currencyName: string) =>
    `You have selected currency: ${currencyName}`,
  hotelBookedMessage: (
    animalsCount: number,
    arrivalDate: Date | string,
    departureDate: Date | string
  ) =>
    `You have booked ${animalsCount} seats from ${formatStringDate(
      Date.parse(arrivalDate.toString())
    )} to ${formatStringDate(Date.parse(departureDate.toString()))}`,
  changedAvatarMessage: () => "Your avatar has been changed",
  changedPasswordMessage: () => "Your password has been changed",
  changedPersonalDataMessage: () => "Your personal date has been changed",
  copiedMessage: () => "The hotel link has been copied!",
  createdWishlistMessage: (wishlistName: string) =>
    `Wishlist named ${wishlistName} has been created and the hotel has been added to it`,
  addedToWishlistMessage: (wishlistName: string) =>
    `The hotel has been added to the ${wishlistName} wishlist`,
  removedFromWishlistMessage: (wishlistName: string) =>
    `Hotel removed from ${wishlistName} wishlist`,
};

export const links = {
  serverUrl: "http://localhost:8080/",
  apiUrl: "http://localhost:3001/",
  noAvatar:
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  noBackground: "https://www.tascsoftware.co.uk/wiki/PARS/images/8/8f/Grey.jpg",
  facebookLink: "https://www.facebook.com/",
  telegramLink: (url: string, path: string) => `tg://msg?text=${url}${path}`,
  whatsAppLink: (url: string, path: string) =>
    `whatsapp://send?abid=phonenumber&text=${url}${path}`,
  twitterLink: "https://twitter.com/intent/tweet?url=link_to_be_shared",
  noImage: "https://i.ibb.co/LCjP65p/noImage.jpg",
  errorSign: "https://i.ibb.co/yFHZ4GN/404.png",
};

export const apiErrors = [
  "Cannot find user",
  "Incorrect password",
  "Email already exists",
  "This email or login already exists",
];

export const stringMonthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
