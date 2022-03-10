export const userUrl = "http://localhost:3000/users";

export const jwtDecode = (token: string) => {
  try {
    const arrToken = token.split(".");
    const base64Token = atob(arrToken[1]);
    return JSON.parse(base64Token);
  } catch (e) {
    console.log("Error decode JWT: " + e);
  }
};

export const jwtCode = (object: { email: string; password: string }) => {
  try {
    const token = btoa(JSON.stringify(object));
    return token;
  } catch (e) {
    console.log("Error code JWT: " + e);
  }
};

export function validateEmail(email: string) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    email.toLowerCase()
  );
}

export function validatePassword(password: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/.test(password);
}

export function validateLogin(login: string) {
  return /^[a-z0-9_-]{3,8}$/.test(login);
}
