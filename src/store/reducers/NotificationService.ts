import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { links } from "../../helpers/consts";
import { NotificationModel } from "../../server/api/api-models";

interface INotificationAPI {
  notifications: NotificationModel[] | NotificationModel;
}

export const notificationAPI = createApi({
  reducerPath: "notifications",
  baseQuery: fetchBaseQuery({ baseUrl: links.apiUrl }),
  tagTypes: ["Notifications"],
  endpoints: (build) => ({
    fetchAllNotifications: build.query<INotificationAPI, number | string>({
      query: (limit = "") => ({
        url: "notifications",
        params:
          limit !== ""
            ? {
                _limit: limit,
              }
            : null,
      }),
      providesTags: (result) => ["Notifications"],
    }),
    createNotification: build.mutation<INotificationAPI, NotificationModel>({
      query: (notification) => ({
        url: "notifications",
        method: "POST",
        body: notification,
      }),
      invalidatesTags: ["Notifications"],
    }),
    updateNotification: build.mutation<INotificationAPI, NotificationModel>({
      query: (notification) => ({
        url: `/notifications/${notification.id}`,
        method: "PUT",
        body: notification,
      }),
      invalidatesTags: ["Notifications"],
    }),
    deleteNotification: build.mutation<INotificationAPI, string>({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});
