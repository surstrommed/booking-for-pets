import React, { useState, useEffect } from "react";
import { Button, Box, TextField } from "@mui/material";
import { forOwnersStyles } from "./forOwnersStyles";
import {
  CONFIRMED_REQUEST_MESSAGE,
  REJECTED_REQUEST_MESSAGE,
} from "../../helpers/consts";

export const RequestNotification = ({
  updateNotificationMessage,
  typeIndex,
  requestConfirm,
  requestReject,
}) => {
  const [notificationText, setNotificationText] = useState("");
  const [sendStatus, setSendStatus] = useState(false);
  const { type, requestId } = typeIndex;

  useEffect(() => {
    if (notificationText.length > 0) {
      updateNotificationMessage(notificationText);
    } else {
      updateNotificationMessage("");
    }
  }, [notificationText]);

  useEffect(() => {
    if (sendStatus) {
      if (type === CONFIRMED_REQUEST_MESSAGE) {
        requestConfirm(requestId);
      }
      if (type === REJECTED_REQUEST_MESSAGE) {
        requestReject(requestId);
      }
    }
  }, [sendStatus]);

  const handleSendStatus = () => {
    setSendStatus(true);
  };

  return (
    <Box>
      <TextField
        id="notification"
        label="Notification text"
        value={notificationText}
        onChange={(e) => setNotificationText(e.target.value)}
        rows={3}
        color="secondary"
        fullWidth
        multiline
      />
      <Button
        onClick={handleSendStatus}
        variant="contained"
        color="secondary"
        sx={forOwnersStyles.sendButton}
      >
        Send
      </Button>
    </Box>
  );
};
