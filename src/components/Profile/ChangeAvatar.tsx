import React from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import { Box, Typography } from "@mui/material";
import { CDropzone } from "./../Auxiliary/Dropzone";

const ChangeAvatar = ({ auth }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Your avatar:
      </Typography>
      <hr />
      <div id="changeAvatar">
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 200, md: 167 },
            maxWidth: { xs: 317, md: 250 },
          }}
          alt="Avatar image"
          src={
            auth?.["payload"]?.["pictureUrl"] ||
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          }
        />
        <CDropzone
          type="image"
          limit={1}
          text={"Drag and drop image here for change your avatar"}
        />
      </div>
    </div>
  );
};

export const CChangeAvatar = connect(
  (state: RootState) => ({ auth: state.auth }),
  null
)(ChangeAvatar);
