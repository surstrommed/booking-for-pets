import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  smallHeader: boolean;
  bigHeader: boolean;
  expandSmallHeader: boolean;
}

const initialState: AuthState = {
  smallHeader: false,
  bigHeader: true,
  expandSmallHeader: false,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    small(state) {
      return {
        ...state,
        smallHeader: true,
        bigHeader: false,
        expandSmallHeader: false,
      };
    },
    big(state) {
      return {
        ...state,
        smallHeader: false,
        bigHeader: true,
        expandSmallHeader: false,
      };
    },
    expand(state) {
      return {
        ...state,
        smallHeader: false,
        bigHeader: false,
        expandSmallHeader: true,
      };
    },
  },
});

export default headerSlice.reducer;
