import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { HotelModel } from "../server/api/api-models";
import { stringMonthsArray, apiErrors } from "./consts";
import { Jwt, create, verify, JSONMap } from "njwt";

export const stringMonth = (monthNumber: number) => {
  return stringMonthsArray[monthNumber];
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

export const jwtHelper = (
  payload: JSONMap,
  key: string,
  token?: string,
  type: string = "create"
) => {
  let jwt: Jwt | string = "";
  switch (type) {
    case "create":
      try {
        jwt = create(payload, key).compact();
      } catch (e) {
        return e;
      }
      return jwt;
      break;
    case "verify":
      try {
        jwt = verify(token, key);
      } catch (e) {
        return e;
      }
      return jwt;
      break;
  }
};
