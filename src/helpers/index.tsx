import React from "react";
import CryptoJS from "crypto-js";
import ErrorIcon from "@mui/icons-material/Error";

const apiErrors = [
  "Cannot find user",
  "Incorrect password",
  "Email already exists",
  "This email or login already exists",
];

export const apiUrl = "http://localhost:3000/";

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

export const jwtCode = (data: { email: string; login: string }) => {
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

export const validatePassword =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const validateLogin = /^[a-z0-9]{3,8}$/;

export function checkError(checkString: string) {
  return apiErrors.includes(checkString);
}

export const validationError = (text: string) => (
  <span style={{ display: "flex", textAlign: "center" }}>
    <ErrorIcon />
    {text}
  </span>
);
