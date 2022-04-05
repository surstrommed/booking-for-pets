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

export const apiUrl = "http://localhost:3000/";

export const noAvatar =
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

export const defaultCurrencyId = 1;

export const stringMonth = (monthNumber) => {
  return stringMonthsArray[monthNumber];
};

export const jwtDecode = (token: string) => {
  try {
    const arrToken = token.split(".");
    const base64Token = atob(arrToken[1]);
    return JSON.parse(base64Token);
  } catch (e) {
    console.log("Error decode JWT: " + e);
  }
};

function base64url(source) {
  let encodedSource = CryptoJS.enc.Base64.stringify(source);
  encodedSource = encodedSource.replace(/=+$/, "");
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
}

export const jwtCode = (data) => {
  try {
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
  } catch (e) {
    console.log("Error code JWT: " + e);
  }
};

export const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const validatePassword =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const validateLogin = /^[a-z0-9]{3,8}$/;

export const validateFirstName = /^([A-Z]{1}[a-z]{2,14})$/;

export const validateLastName = /^([A-Z]{1}[a-z]{2,19})$/;

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
