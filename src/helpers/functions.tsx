import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { UserModel, IJwtHelper, WishlistModel } from "../server/api/api-models";
import {
  stringMonthsArray,
  apiErrors,
  SECRET_KEY,
  sendSnackBarMessages,
} from "./consts";
import { Jwt, create, verify } from "njwt";

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

export const setTabsProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

export const jwtHelper = ({
  payload,
  key,
  token,
  type = "create",
}: IJwtHelper) => {
  let jwt: Jwt | string = "";
  if (type === "create") {
    try {
      jwt = create(payload, key).compact();
    } catch (e) {
      return e;
    }
  }
  if (type === "verify") {
    try {
      jwt = verify(token, key);
    } catch (e) {
      return e;
    }
  }
  return jwt;
};

export const formateUser = () => {
  const { body: jwtBody } = jwtHelper({
    token: sessionStorage?.token,
    key: SECRET_KEY,
    type: "verify",
  });

  const currentUser = { ...jwtBody };

  if (currentUser?.iat) {
    delete currentUser.iat;
  }
  if (currentUser?.exp) {
    delete currentUser.exp;
  }
  if (currentUser?.jti) {
    delete currentUser.jti;
  }

  return currentUser;
};

export const checkUser = (payload: UserModel) => {
  if (
    payload?.id &&
    payload?.email &&
    payload?.login &&
    payload?.firstName &&
    payload?.lastName &&
    payload?.createdAt &&
    (payload?.pictureUrl || payload?.pictureUrl === null) &&
    payload?.currencyId &&
    Array.isArray(payload?.wishlists)
  ) {
    return true;
  } else {
    return false;
  }
};

export const updateJwtToken = (payload) => {
  let jwtToken = "";
  jwtToken = jwtHelper({
    payload: payload,
    key: SECRET_KEY,
    type: "create",
  });
  sessionStorage.setItem("token", jwtToken);
};

export const unsaveHotelFromWishlist = async ({
  hotelData,
  isSaved,
  currentUser,
  userUpdate,
  userUpdateError,
  sendSnackbar,
}) => {
  const currentUserWishlists = currentUser?.wishlists;

  const isSavedIndex = (currentUserWishlists || []).findIndex(
    (wishlist: WishlistModel) => wishlist.hotelsId.includes(hotelData.id)
  );

  const filteredHotelsId = isSaved.hotelsId.filter(
    (hotelId: string) => hotelId !== hotelData.id
  );

  const filteredUserWishlists = [...currentUserWishlists];

  filteredUserWishlists.splice(isSavedIndex, 1);

  const filteredCurrentUserWishlist = {
    ...currentUserWishlists[isSavedIndex],
    hotelsId: filteredHotelsId,
  };

  filteredUserWishlists.push(filteredCurrentUserWishlist);

  const response = await userUpdate({
    ...currentUser,
    password: currentUser?.password,
    wishlists: filteredUserWishlists,
  });

  if (response?.data) {
    updateJwtToken({ ...response?.data, password: currentUser?.password });
  }

  if (typeof sendSnackbar === "function" && !userUpdateError?.data) {
    sendSnackbar({
      msg: sendSnackBarMessages.removedFromWishlistMessage(isSaved?.name),
      variant: "error",
    });
  }
};
