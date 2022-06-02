import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { store } from "../components/App";

export type RootState = ReturnType<typeof store.getState>;

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
