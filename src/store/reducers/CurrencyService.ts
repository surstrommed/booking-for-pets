import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { links } from "../../helpers/consts";
import { ICurrency } from "../../server/api/api-models";

export const currencyAPI = createApi({
  reducerPath: "currencyList",
  baseQuery: fetchBaseQuery({ baseUrl: links.currencyChange }),
  tagTypes: ["CurrencyList"],
  endpoints: (build) => ({
    fetchAllCurrency: build.query<ICurrency, number | string>({
      query: (limit = "") => ({
        url: "",
        params:
          limit !== ""
            ? {
                _limit: limit,
              }
            : null,
      }),
      providesTags: (result) => ["CurrencyList"],
    }),
  }),
});
