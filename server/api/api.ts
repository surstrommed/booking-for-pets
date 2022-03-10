import { myFetch } from "../../helpers/requests";
import { UserModel } from "./../api-models";
import { userUrl } from "./../../helpers/index";

export const getUsers = async () => {
  try {
    const users: UserModel[] = await myFetch(userUrl);
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (userData: UserModel) => {
  try {
    const users: UserModel = await myFetch(userUrl, userData, "POST");
    return users;
  } catch (error) {
    console.log(error);
  }
};
