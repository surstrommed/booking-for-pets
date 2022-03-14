import { getState } from "../components/App";
import {
  isUnregistered,
  isExisted,
  userLogin,
  userRegister,
  userUpdate,
} from "../server/api/api";
import { actionPromise } from "./thunks";

export const actionLogin = (email: string, password: string) => {
  return actionPromise("signin", userLogin({ email, password }));
};

export const actionRegister = (
  email: string,
  login: string,
  password: string
) => {
  if (isUnregistered(email, login)) {
    return actionPromise("signup", userRegister({ email, login, password }));
  } else {
    const signUpError = document.getElementById("signUpError");
    const signUpForm = <HTMLFormElement>document.getElementById("signUpForm");
    if (signUpError && signUpForm) {
      signUpError.style.display = "block";
      signUpForm.reset();
    }
  }
};

export const actionUpdate = (
  id: number,
  email: string,
  login: string,
  password: string
) => {
  const { auth } = getState();
  const user = auth?.payload;
  return actionPromise(
    "userUpdate",
    userUpdate({ ...user, id, email, login, password }, "PUT")
  );
};
