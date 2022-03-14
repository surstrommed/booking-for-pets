import { JsonModel, UserModel } from "./api-models";
import jsonData from "../db.json";
import { apiUrl } from "./../../helpers/index";

export const myFetch =
  (url: string) =>
  async (data: object = {}, type: string = "POST") => {
    const obj = await fetch(type === "PUT" ? `${url}/${data["id"]}` : url, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await obj.json();
    if (Object.keys(response).length === 0) throw new Error("Fetch error");
    return response;
  };

export const userRegister = myFetch(apiUrl + "register");

export const userLogin = myFetch(apiUrl + "login");

export const userUpdate = myFetch(apiUrl + "users");

const db: JsonModel = JSON.parse(JSON.stringify(jsonData));

export const isExisted = (email: string, login: string) =>
  db.users.find(
    (user: UserModel) => user.email === email && user.login === login
  );

export const isUnregistered = (email: string, login: string) =>
  db.users.findIndex(
    (user: UserModel) => user.email === email && user.login === login
  ) === -1;
