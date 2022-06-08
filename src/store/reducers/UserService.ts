import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { string } from "yup";
import { links } from "../../helpers/consts";
import { UserModel } from "../../server/api/api-models";

interface IUsersAPI {
  data: UserModel;
}

export const usersAPI = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: links.apiUrl }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUsersAPI, number | string>({
      query: (limit = "") => ({
        url: "users",
        params:
          limit !== ""
            ? {
                _limit: limit,
              }
            : null,
      }),
      providesTags: (result) => ["Users"],
    }),
    updateUser: build.mutation<IUsersAPI, UserModel>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation<IUsersAPI, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
