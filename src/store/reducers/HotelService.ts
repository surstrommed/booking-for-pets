import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { links } from "../../helpers/consts";
import { HotelModel } from "../../server/api/api-models";

interface IHotelAPI {
  notifications: HotelModel[] | HotelModel;
}

export const hotelAPI = createApi({
  reducerPath: "hotels",
  baseQuery: fetchBaseQuery({ baseUrl: links.apiUrl }),
  tagTypes: ["Hotels"],
  endpoints: (build) => ({
    fetchAllHotels: build.query<IHotelAPI, number | string>({
      query: (limit = "") => ({
        url: "hotels",
        params:
          limit !== ""
            ? {
                _limit: limit,
              }
            : null,
      }),
      providesTags: (result) => ["Hotels"],
    }),
    createHotel: build.mutation<IHotelAPI, HotelModel>({
      query: (hotel) => ({
        url: "hotels",
        method: "POST",
        body: hotel,
      }),
      invalidatesTags: ["Hotels"],
    }),
    updateHotel: build.mutation<IHotelAPI, HotelModel>({
      query: (hotel) => ({
        url: `/hotels/${hotel.id}`,
        method: "PUT",
        body: hotel,
      }),
      invalidatesTags: ["Hotels"],
    }),
    deleteHotel: build.mutation<IHotelAPI, HotelModel>({
      query: (hotel) => ({
        url: `/hotels/${hotel.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hotels"],
    }),
  }),
});
