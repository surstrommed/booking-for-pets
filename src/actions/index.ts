import {
  isUnregistered,
  isAuthenticated,
  usersRequest,
} from "../../server/api/api";
import { actionPromise } from "./types";

export const actionLogin = (email: string, password: string) => {
  if (isAuthenticated(email, password)) {
    return actionPromise("signin", usersRequest({ email, password }));
  } else {
    const signInError = document.getElementById("signInError");
    const authForm = <HTMLFormElement>document.getElementById("authForm");
    if (signInError && authForm) {
      signInError.style.display = "block";
      authForm.reset();
    }
  }
};

export const actionRegister = (
  email: string,
  login: string,
  password: string
) => {
  if (isUnregistered(email, login)) {
    return actionPromise(
      "signup",
      usersRequest({ email, login, password }, "POST")
    );
  } else {
    const signInError = document.getElementById("signInError");
    const authForm = <HTMLFormElement>document.getElementById("authForm");
    if (signInError && authForm) {
      signInError.style.display = "block";
      authForm.reset();
    }
  }
};
