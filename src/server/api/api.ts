import { JsonModel, UserModel } from "./api-models";
import axios from "axios";
import jsonData from "../db.json";
import { apiUrl } from "../../helpers/index";

const myFetch =
  (url: string) =>
  async (data: object = {}, type: string = "POST") => {
    if (Object.keys(data).length === 0) {
      type = "GET";
    }
    const obj = await fetch(
      type === "PUT" ? `${url}/${data["id"]}` : url,
      type !== "GET"
        ? {
            method: type,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        : null
    );
    const response = await obj.json();
    if (Object.keys(response).length === 0)
      throw new Error(
        "Failed to connect to the server, please try again later."
      );
    return response;
  };

const imageFetch = (url: string) => async (file: File) => {
  const payload = new FormData();
  payload.append("image", file);
  const obj = await axios.post(url, payload).catch(() => {
    throw new Error("Failed to connect to the server, please try again later.");
  });
  return obj?.data?.data?.image?.url;
};

const exchangeRatesFetch = (url: string) => async () => {
  const obj = await axios.get(url).catch(() => {
    throw new Error("Failed to connect to the server, please try again later.");
  });
  return obj?.data?.rates;
};

export const uploadImage = imageFetch(
  "https://api.imgbb.com/1/upload?key=478a8e5dc3d296b8693734b3983d5902"
);

export const userRegister = myFetch(apiUrl + "register");

export const userLogin = myFetch(apiUrl + "login");

export const userUpdate = myFetch(apiUrl + "users");

export const getHotels = myFetch(apiUrl + "hotels");

export const getCurrency = myFetch(apiUrl + "currency");

export const getExchangeRates = exchangeRatesFetch(
  "https://openexchangerates.org/api/latest.json?app_id=68546b0af6d145a7a1f7260446e53927"
);

const db: JsonModel = JSON.parse(JSON.stringify(jsonData));

export const isExisted = (email: string, login: string) =>
  db.users.find(
    (user: UserModel) => user.email === email && user.login === login
  );

export const isSignupAuthenticated = (login: string) =>
  db.users.findIndex((user) => user.login === login) !== -1;
