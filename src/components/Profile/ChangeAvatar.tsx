import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../helpers/types";
import { Box } from "@mui/material";
import { Dropzone } from "./../Auxiliary/Dropzone";
import { changeProfileStyles } from "./profileStyles";
import { links, sendSnackBarMessages } from "../../helpers/consts";
import { Badge, IconButton, Card, CardActions } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { actionDeleteAvatar as deleteAvatar } from "../../actions/thunks";
import useSnackBar from "../Auxiliary/SnackBar";

export const ChangeAvatar = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const [state, setState] = useState({
    prevState: auth.payload.pictureUrl,
    currentState: "",
  });

  const [, sendSnackbar] = useSnackBar();

  useEffect(() => {
    setState({ ...state, currentState: auth.payload.pictureUrl });
  }, [auth.payload.pictureUrl]);

  useEffect(() => {
    if (
      state.prevState !== state.currentState &&
      state.currentState !== "" &&
      typeof sendSnackbar === "function"
    ) {
      sendSnackbar({
        msg: sendSnackBarMessages.changedAvatarMessage(),
        variant: "success",
      });
    }
  }, [state]);

  return (
    <Card sx={changeProfileStyles.avatarCard}>
      {auth?.payload?.pictureUrl ? (
        <Badge
          overlap="circular"
          sx={changeProfileStyles.avatarBadge}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          badgeContent={
            <IconButton onClick={deleteAvatar}>
              <CancelIcon />
            </IconButton>
          }
        >
          <Box
            component="img"
            sx={changeProfileStyles.avatarImage}
            alt="Avatar image"
            src={auth.payload.pictureUrl}
          />
        </Badge>
      ) : (
        <Box
          component="img"
          sx={changeProfileStyles.avatarImage}
          alt="Avatar image"
          src={links.noAvatar}
        />
      )}
      <CardActions>
        <Dropzone
          type="image"
          limit={1}
          text={"Drag and drop image here for change your avatar"}
        />
      </CardActions>
    </Card>
  );
};
