import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserModel } from "../../server/api/api-models";
import { links } from "../../helpers/consts";

interface IAuthAPI {
  accessToken: string;
  user: UserModel;
}

export const authAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: links.apiUrl }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    signin: build.mutation<IAuthAPI, UserModel>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    signup: build.mutation<IAuthAPI, UserModel>({
      query: (user) => {
        const modifiedUser = {
          ...user,
          currencyId: 1,
          createdAt: Date.parse(new Date().toString()),
          pictureUrl: null,
          wishlists: [],
        };
        return {
          url: "register",
          method: "POST",
          body: modifiedUser,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});
