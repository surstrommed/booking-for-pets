import { JsonModel, UserModel } from "./api-models";
import jsonData from "../db.json";
import { apiUrl } from "./../../helpers/index";

export const myFetch =
  (url: string) =>
  async (data: object = {}, type: string = "GET") => {
    const obj = await fetch(
      url,
      type === "POST" && {
        method: type,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const a = await obj.json();
    if (!a.data && a.errors) throw new Error(JSON.stringify(a.errors));
    return a.data[Object.keys(a.data)[0]];
  };

export const usersRequest = myFetch(apiUrl + "users");

const db: JsonModel = JSON.parse(JSON.stringify(jsonData));

export const isAuthenticated = (email: string, password: string) =>
  db.users.findIndex(
    (user: UserModel) => user.email === email && user.password === password
  ) !== -1;

export const isUnregistered = (email: string, login: string) =>
  db.users.findIndex(
    (user: UserModel) => user.email === email && user.login === login
  ) === -1;
