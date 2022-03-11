import { put, call, takeEvery } from "redux-saga/effects";
import {
  actionPending,
  actionRejected,
  actionResolved,
  actionAuthLogin,
} from "./types";
import { actionLogin, actionRegister } from "./index";
import { Action } from "redux";
import { history } from "./../components/App";

interface ILogin {
  email: string;
  password: string;
}
interface LoginAction extends Action, ILogin {
  type: "FULL_LOGIN";
}

interface IRegister {
  email: string;
  login: string;
  password: string;
}
interface RegisterAction extends Action, IRegister {
  type: "FULL_REGISTER";
}

function* promiseWorker(action) {
  const { name, promise } = action;
  yield put(actionPending(name));
  try {
    const data = yield promise;
    yield put(actionResolved(name, data));
    return data;
  } catch (error) {
    yield put(actionRejected(name, error));
  }
}

export function* promiseWatcher() {
  yield takeEvery("PROMISE_START", promiseWorker);
}

function* loginWorker({ email, password }: ILogin) {
  const token = yield call(promiseWorker, actionLogin(email, password));
  console.log("Login worker: ", token);
  if (token) {
    yield put(actionAuthLogin(token));
    history.push("/");
    history.go(0);
  }
}

export function* loginWatcher() {
  yield takeEvery<LoginAction>("FULL_LOGIN", loginWorker);
}

function* registerWorker({ email, login, password }: IRegister) {
  yield call(promiseWorker, actionRegister(email, login, password));
  const token = yield call(promiseWorker, actionLogin(email, password));
  console.log("Register worker: ", token);
  if (token) {
    yield put(actionAuthLogin(token));
    history.push("/");
    history.go(0);
  }
}

export function* registerWatcher() {
  yield takeEvery<RegisterAction>("FULL_REGISTER", registerWorker);
}
