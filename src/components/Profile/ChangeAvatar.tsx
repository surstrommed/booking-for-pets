import React from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import { Box } from "@mui/material";
import { CDropzone } from "./../Auxiliary/Dropzone";
import { changeProfileStyles } from "./profileStyles";
import { noAvatar } from "../../helpers/index";
import { Badge, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const ChangeAvatar = ({ auth, deleteAvatar }) => {
  return (
    <Card sx={changeProfileStyles.avatarCard}>
      {auth?.payload?.pictureUrl ? (
        <Badge
          overlap="circular"
          sx={changeProfileStyles.avatarBadge}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          badgeContent={
            <IconButton onClick={() => deleteAvatar()}>
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
          src={noAvatar}
        />
      )}
      <CardActions>
        <CDropzone
          type="image"
          limit={1}
          text={"Drag and drop image here for change your avatar"}
        />
      </CardActions>
    </Card>
  );
};

export const CChangeAvatar = connect(
  (state: RootState) => ({ auth: state.auth }),
  {
    deleteAvatar: actionDeleteAvatar,
  }
)(ChangeAvatar);
