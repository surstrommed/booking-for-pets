import { UserModel } from "./../server/api-models";
import { jwtCode } from "./index";
import { history } from "./../src/components/App";
import { addUser, getUsers } from "./../server/api/api";

export async function myFetch(url = "", data = {}, type?: string) {
  const response = await fetch(
    url,
    type && {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json();
}

export const signIn = async (email: string, password: string) => {
  try {
    const users = await getUsers();
    let userObject: { email: string; password: string };
    for (const user of users) {
      if (user?.email === email && user?.password === password) {
        userObject = {
          email,
          password,
        };
        localStorage.authToken = jwtCode(userObject);
        history.push("/");
        history.go(0);
        return;
      }
    }
    const signInError = document.getElementById("signInError");
    const authForm = <HTMLFormElement>document.getElementById("authForm");
    if (signInError && authForm) {
      signInError.style.display = "block";
      authForm.reset();
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (
  email: string,
  login: string,
  password: string
) => {
  try {
    const users = await getUsers();
    for (const user of users) {
      if (user?.email === email || user?.login === login) {
        const userExistsError = document.getElementById("userExistsError");
        const authForm = <HTMLFormElement>document.getElementById("authForm");
        if (userExistsError && authForm) {
          userExistsError.style.display = "block";
          authForm.reset();
          return;
        }
      }
    }
    const id: string = `${+users[users.length - 1]?.id + 1}`;
    const newUser: UserModel = {
      id,
      email,
      login,
      password,
    };
    addUser(newUser);
    signIn(email, password);
  } catch (error) {
    console.log(error);
  }
};
