import { createSlice } from "@reduxjs/toolkit";

interface HeaderState {
  smallHeader: boolean;
  bigHeader: boolean;
  expandSmallHeader: boolean;
}

const initialState: HeaderState = {
  smallHeader: false,
  bigHeader: true,
  expandSmallHeader: false,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    small(state) {
      state.smallHeader = true;
      state.bigHeader = false;
      state.expandSmallHeader = false;
    },
    big(state) {
      state.smallHeader = false;
      state.bigHeader = true;
      state.expandSmallHeader = false;
    },
    expand(state) {
      state.smallHeader = false;
      state.bigHeader = false;
      state.expandSmallHeader = true;
    },
  },
});

export default headerSlice.reducer;
