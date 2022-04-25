import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { rootReducer } from "../components/App";

export type RootState = ReturnType<typeof rootReducer>;

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
