import { getState } from "../components/App";
import {
  userLogin,
  userRegister,
  userUpdate,
  uploadImage,
} from "../server/api/api";
import { actionPromise } from "./thunks";
import { UserModel } from "../server/api/api-models";

export const actionLogin = (email: string, password: string) => {
  return actionPromise("signin", userLogin({ email, password }));
};

export const actionRegister = (
  email: string,
  login: string,
  password: string
) => {
  return actionPromise("signup", userRegister({ email, login, password }));
};

export const actionUpdate = ({
  id,
  email,
  login,
  password,
  pictureUrl,
}: UserModel) => {
  const { auth } = getState();
  const user = auth?.payload;
  const newUserData = { id, email, login, password, pictureUrl };
  const arrayUserData = Object.entries(newUserData);
  const filteredUserData = arrayUserData.filter(
    ([key, value]) => typeof value !== "undefined"
  );
  const filteredObj = {};
  for (let i = 0; i < filteredUserData.length; i++) {
    filteredObj[filteredUserData[i][0]] = filteredUserData[i][1];
  }
  return actionPromise(
    "userUpdate",
    userUpdate({ ...user, ...filteredObj }, "PUT")
  );
};

export const actionUploadPhoto = (image: File) => {
  return actionPromise("uploadAvatar", uploadImage(image));
};
