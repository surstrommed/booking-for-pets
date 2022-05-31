import { JsonModel, UserModel } from "./api-models";
import axios from "axios";
import { links } from "../../helpers/consts";

const myFetch =
  (url: string) =>
  async (data: object = {}, type: string = "POST") => {
    if (Object.keys(data).length === 0) {
      type = "GET";
    }
    const obj = await fetch(
      type === "PUT" ? `${url}/${data?.["id"]}` : url,
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

export const uploadImage = imageFetch(links.uploadImage);

export const userRegister = myFetch(links.apiUrl + "register");

export const userLogin = myFetch(links.apiUrl + "login");

export const userUpdate = myFetch(links.apiUrl + "users");

export const getHotels = myFetch(links.apiUrl + "hotels");

export const getCurrency = myFetch(links.apiUrl + "currency");

export const getExchangeRates = exchangeRatesFetch(links.currencyChange);

export const getNotifications = myFetch(links.apiUrl + "notifications");
