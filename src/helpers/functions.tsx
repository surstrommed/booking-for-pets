import React from "react";
import CryptoJS from "crypto-js";
import ErrorIcon from "@mui/icons-material/Error";
import { jwtCodeData } from "./types";
import { HotelModel } from "../server/api/api-models";
import { stringMonthsArray, apiErrors } from "./consts";

export const stringMonth = (monthNumber: number) => {
  return stringMonthsArray[monthNumber];
};

export const jwtDecode = (token: string) => {
  const arrToken = token.split(".");
  const base64Token = atob(arrToken[1]);
  return JSON.parse(base64Token);
};

const base64url = (source: string) => {
  let encodedSource = CryptoJS.enc.Base64.stringify(source);
  encodedSource = encodedSource.replace(/=+$/, "");
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
};

export const jwtCode = (data: jwtCodeData) => {
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

export const checkError = (checkString: string) => {
  return apiErrors.includes(checkString);
};

export const validationError = (text: string) => (
  <span style={{ display: "flex", textAlign: "center" }}>
    <ErrorIcon />
    {text}
  </span>
);

export const uniqueArray = (arr: string[] | number[]) => {
  const result = [];
  for (const value of arr) {
    if (!result.includes(value) && value !== "") {
      result.push(value);
    }
  }
  return result;
};

export const spaceFormatting = (str: string) => {
  return str.replace(/(%20)/g, " ");
};

export const truncText = (str: string, length: number) => {
  if (str.length > length) {
    return `${str.slice(0, length)}...`;
  } else {
    return str;
  }
};

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const formatStringDate = (date: Date | number) =>
  `${stringMonth(new Date(date).getMonth())} ${new Date(
    date
  ).getDate()}, ${new Date(date).getFullYear()}`;

export const createUniqueId = () => {
  let result = "";
  const words =
    "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  const maxPosition = words.length - 1;
  for (let i = 0; i < 5; ++i) {
    const position = Math.floor(Math.random() * maxPosition);
    result = result + words.substring(position, position + 1);
  }
  return result;
};

export const getUniqueId = (entityData: HotelModel[]) => {
  const emptyHotelIndex = entityData.findIndex(
    (hotel: HotelModel) => hotel.owner === 0
  );

  if (emptyHotelIndex !== -1) {
    return entityData[emptyHotelIndex].id;
  }

  const uniqueId = createUniqueId();
  const matchId = entityData.findIndex(
    (hotel: HotelModel) => hotel.id === uniqueId
  );

  if (matchId === -1) {
    return uniqueId;
  } else {
    getUniqueId(entityData);
  }
};

export const setTabsProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});
