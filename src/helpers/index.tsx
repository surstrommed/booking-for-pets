import React from "react";
import CryptoJS from "crypto-js";
import ErrorIcon from "@mui/icons-material/Error";

const apiErrors = [
  "Cannot find user",
  "Incorrect password",
  "Email already exists",
  "This email or login already exists",
];

const stringMonthsArray = [
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

export const defaultCurrencyId = 1;

export const maxAnimals = 10;

export const stringMonth = (monthNumber) => {
  return stringMonthsArray[monthNumber];
};

export const jwtDecode = (token: string) => {
  const arrToken = token.split(".");
  const base64Token = atob(arrToken[1]);
  return JSON.parse(base64Token);
};

function base64url(source) {
  let encodedSource = CryptoJS.enc.Base64.stringify(source);
  encodedSource = encodedSource.replace(/=+$/, "");
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
}

export const jwtCode = (data: { email: string; login: string }) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);
  const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);
  let token = encodedHeader + "." + encodedData;
  token = encodedHeader + "." + encodedData + "." + CryptoJS.SHA256(token);
  return token;
};

export const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const validatePassword =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const validateLogin = /^[a-z0-9]{3,8}$/;

export const validateFirstName = /^([A-Z]{1}[a-z]{2,14})$/;

export const validateLastName = /^([A-Z]{1}[a-z]{2,19})$/;

export const validateWishlistName = /^([a-zA-Z0-9]{2,20})$/;

export function checkError(checkString: string) {
  return apiErrors.includes(checkString);
}

export const validationError = (text: string) => (
  <span style={{ display: "flex", textAlign: "center" }}>
    <ErrorIcon />
    {text}
  </span>
);

export function uniqueArray(arr) {
  const result = [];
  for (const str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}

export function spaceAfterComma(str) {
  const strArray = str.split("");
  for (let i = 0; i < strArray.length - 1; i++) {
    if (strArray[i] === "," && strArray[i + 1]) {
      strArray.splice(i + 1, 0, " ");
    }
  }
  return strArray.join("");
}

export function truncText(str) {
  if (str.length > 40) {
    return str.slice(0, 40) + "...";
  } else {
    return str;
  }
}

export function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function formatStringDate(date) {
  return `${stringMonth(new Date(date).getMonth())} ${new Date(
    date
  ).getDate()}, ${new Date(date).getFullYear()}`;
}

export const sendSnackBarMessages = {
  selectedCurrencyMessage: (currencyName) =>
    `You have selected currency: ${currencyName}`,
  hotelRemovedMessage: (savedHotelName) =>
    `Hotel removed from ${savedHotelName} wishlist`,
  hotelBookedMessage: (animalsCount, arrivalDate, departureDate) =>
    `You have booked ${animalsCount} seats from ${formatStringDate(
      Date.parse(arrivalDate)
    )} to ${formatStringDate(Date.parse(departureDate))}`,
  changedAvatarMessage: () => "Your avatar has been changed",
  changedPasswordMessage: () => "Your password has been changed",
  changedPersonalDataMessage: () => "Your personal date has been changed",
  copiedMessage: () => "The hotel link has been copied!",
  createdWishlistMessage: (wishlistName) =>
    `Wishlist named ${wishlistName} has been created and the hotel has been added to it`,
  addedToWishlistMessage: (wishlistName) =>
    `The hotel has been added to the ${wishlistName} wishlist`,
  removedFromWishlistMessage: (wishlistName) =>
    `Hotel removed from ${wishlistName} wishlist`,
};

export const links = {
  serverUrl: "http://localhost:8080/",
  apiUrl: "http://localhost:3000/",
  noAvatar:
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  noBackground: "https://www.tascsoftware.co.uk/wiki/PARS/images/8/8f/Grey.jpg",
  facebookLink: "https://www.facebook.com/",
  telegramLink: (url, path) => `tg://msg?text=${url}${path}`,
  whatsAppLink: (url, path) =>
    `whatsapp://send?abid=phonenumber&text=${url}${path}`,
  twitterLink: "https://twitter.com/intent/tweet?url=link_to_be_shared",
};
