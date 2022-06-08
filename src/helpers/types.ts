import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { rootReducer, setupStore } from "../store/store";

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type GetState = AppStore["getState"];

export type AppDispatch = AppStore["dispatch"];

export type jwtCodeData = { email: string; login: string };

export type payloadTypes = { id: number; email: string };

export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>;

export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export type wishlistName = { wishlistName: string };
