import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../helpers/types";
import {
  IconButton,
  Menu,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { formateUser, truncText } from "../../helpers/functions";
import { links } from "../../helpers/consts";
import { notificationsStyles } from "./notificationsStyles";
import { NotificationModel, UserModel } from "../../server/api/api-models";
import { READ_NOTIFICATION, UNREAD_NOTIFICATION } from "../../helpers/consts";
import { useNavigate } from "react-router-dom";
import { notificationAPI } from "../../store/reducers/NotificationService";
import { Preloader } from "../Auxiliary/Preloader";
import { usersAPI } from "../../store/reducers/UserService";

export const UserNotifications = () => {
  const {
    data: allNotifications,
    error: notificationError,
    isLoading: notificationLoading,
  } = notificationAPI.useFetchAllNotificationsQuery("");

  const {
    data: allUsers,
    error: usersError,
    isLoading: usersLoading,
  } = usersAPI.useFetchAllUsersQuery("");

  const [
    updateNotification,
    { isLoading: updateNotificationLoading, error: updateNotificationError },
  ] = notificationAPI.useUpdateNotificationMutation();

  const [
    deleteNotification,
    { isLoading: deleteNotificationLoading, error: deleteNotificationError },
  ] = notificationAPI.useDeleteNotificationMutation();

  const currentUser = formateUser();

  const navigate = useNavigate();

  const currentUserNotifications = (allNotifications || [])?.filter(
    (notification: NotificationModel) => notification.toId === currentUser?.id
  );

  const [anchorReadMore, setAnchorReadMore] = useState(null);

  const handleOpenReadMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorReadMore(event.currentTarget);
  };

  const handleCloseReadMore = () => {
    setAnchorReadMore(null);
  };

  const findMessageOwner = (userId: number) => {
    return (allUsers || [])?.find((user: UserModel) => user.id === userId);
  };

  const readMessage = async (message: NotificationModel) => {
    await updateNotification({
      ...message,
      status: UNREAD_NOTIFICATION,
    });
  };

  const deleteMessage = async (messageId: string) => {
    await deleteNotification(messageId);
  };

  return (
    <Preloader
      isLoading={
        notificationLoading ||
        usersLoading ||
        updateNotificationLoading ||
        deleteNotificationLoading
      }
      error={
        notificationError?.data ||
        usersError?.data ||
        updateNotificationError?.data ||
        deleteNotificationError?.data
      }
    >
      <div style={notificationsStyles.userNotifications.main}>
        <Typography variant="h3" component="div">
          Your notifications:
          <br />
          {currentUserNotifications.length === 0 && (
            <Typography variant="h4" component="span">
              You currently have no notifications
            </Typography>
          )}
        </Typography>
        {currentUserNotifications.map((notification: NotificationModel) => (
          <Box
            sx={notificationsStyles.userNotifications.notification}
            key={notification.id}
          >
            <Avatar
              alt="Avatar"
              src={
                findMessageOwner(notification.fromId)?.pictureUrl ||
                links.noAvatar
              }
              onClick={() =>
                notification.fromId && navigate(`/users/${notification.fromId}`)
              }
            />
            <Typography
              sx={{ ml: 4 }}
              variant="h6"
              component="div"
            ></Typography>
            <Typography variant="body1">
              <b>Message:</b>{" "}
              {notification.text.length > 20 ? (
                <>
                  {truncText(notification.text, 10)}{" "}
                  <Button onClick={handleOpenReadMore} color="secondary">
                    Read More
                  </Button>
                  <Menu
                    id="menu-read-more"
                    anchorEl={anchorReadMore}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorReadMore)}
                    onClose={handleCloseReadMore}
                  >
                    <Typography
                      variant="body1"
                      sx={notificationsStyles.userNotifications.messageText}
                    >
                      {notification.text}
                    </Typography>
                  </Menu>
                  <br />
                  <Typography variant="body2" component="span">
                    Status:{" "}
                    <span
                      style={{
                        color: `${
                          notification.status === UNREAD_NOTIFICATION
                            ? "red"
                            : "green"
                        }`,
                      }}
                    >
                      {notification.status}
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  {notification.text}
                  <br />
                  <Typography variant="body2" component="span">
                    Status:{" "}
                    <span
                      style={{
                        color: `${
                          notification.status === UNREAD_NOTIFICATION
                            ? "red"
                            : "green"
                        }`,
                      }}
                    >
                      {notification.status}
                    </span>
                  </Typography>
                </>
              )}
            </Typography>
            <Typography
              sx={notificationsStyles.userNotifications.space}
              variant="h6"
              component="div"
            ></Typography>
            <IconButton
              color="secondary"
              onClick={() => readMessage(notification)}
              disabled={notification.status === READ_NOTIFICATION}
            >
              <MarkEmailReadIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => deleteMessage(notification.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </div>
    </Preloader>
  );
};
