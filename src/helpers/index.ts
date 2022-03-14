import CryptoJS from "crypto-js";

export const apiUrl = "http://localhost:3000/";

export const jwtDecode = (token: string) => {
  try {
    const arrToken = token.split(".");
    const base64Token = atob(arrToken[1]);
    return JSON.parse(base64Token);
  } catch (e) {
    console.log("Error decode JWT: " + e);
  }
};

function base64url(source) {
  let encodedSource = CryptoJS.enc.Base64.stringify(source);
  encodedSource = encodedSource.replace(/=+$/, "");
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
}

export const jwtCode = (data: { email: string; login: string }) => {
  try {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };
    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = base64url(stringifiedHeader);
    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    const encodedData = base64url(stringifiedData);
    let token = encodedHeader + "." + encodedData;
    token = encodedHeader + "." + encodedData + "." + CryptoJS.SHA256(token);
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
