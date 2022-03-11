export const actionPending = (name) => ({
  type: "PROMISE",
  status: "PENDING",
  name,
});

export const actionResolved = (name, payload) => ({
  type: "PROMISE",
  status: "RESOLVED",
  name,
  payload,
});

export const actionRejected = (name, error) => ({
  type: "PROMISE",
  status: "REJECTED",
  name,
  error,
});

export const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });

export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });

export const actionPromise = (name, promise) => ({
  type: "PROMISE_START",
  name,
  promise,
});

export const actionFullLogin = (email: string, password: string) => ({
  type: "FULL_LOGIN",
  email,
  password,
});

export const actionFullRegister = (
  email: string,
  login: string,
  password: string
) => ({
  type: "FULL_REGISTER",
  email,
  login,
  password,
});
