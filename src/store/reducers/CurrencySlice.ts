import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrency } from "../../server/api/api-models";

interface CurrencyState {
  currency: ICurrency[];
  isLoading: boolean;
  error: string;
}

const initialState: CurrencyState = {
  currency: [],
  isLoading: false,
  error: "",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    currencyFetching(state) {
      state.isLoading = true;
    },
    currencyFetchingSuccess(state, action: PayloadAction<ICurrency[]>) {
      state.isLoading = false;
      state.error = "";
      state.currency = action.payload;
    },
    currencyFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default currencySlice.reducer;
