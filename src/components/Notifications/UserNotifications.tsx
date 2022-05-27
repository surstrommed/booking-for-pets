import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  actionFullHotelUpdate as onBooking,
  actionFullSendNotification as onUpdateNotification,
} from "../../actions/thunks";
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
import { truncText } from "../../helpers/functions";
import { links } from "../../helpers/consts";
import { notificationsStyles } from "./notificationsStyles";
import { NotificationModel, UserModel } from "../../server/api/api-models";
import {
  DELETED_NOTIFICATION,
  READ_NOTIFICATION,
  UNREAD_NOTIFICATION,
} from "../../helpers/consts";
import { useNavigate } from "react-router-dom";

export const UserNotifications = () => {
  const promise = useSelector((state: RootState) => state.promise);
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const currentUserNotifications = (
    promise.getNotifications?.payload || []
  ).filter(
    (notification: NotificationModel) =>
      notification.toId === auth.payload.id &&
      notification.status !== DELETED_NOTIFICATION
  );

  const { payload: allUsers } = promise.getUsers;

  const [anchorReadMore, setAnchorReadMore] = useState(null);

  const handleOpenReadMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorReadMore(event.currentTarget);
  };

  const handleCloseReadMore = () => {
    setAnchorReadMore(null);
  };

  function findMessageOwner(userId: number) {
    return (allUsers || [])?.find((user: UserModel) => user.id === userId);
  }

  function readMessage(messageId: string) {
    onUpdateNotification({ id: messageId, status: READ_NOTIFICATION });
  }

  function deleteMessage(messageId: string) {
    onUpdateNotification({ id: messageId, status: DELETED_NOTIFICATION });
  }

  return (
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
          <Typography sx={{ ml: 4 }} variant="h6" component="div"></Typography>
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
            onClick={() => readMessage(notification.id)}
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
  );
};
