import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { connect } from "react-redux";
import { actionAuthLogout } from "../../actions/types";
import { RootState, history } from "../App";
import { DriveEtaSharp } from "@mui/icons-material";

type Logout = () => object;
interface IProfile {
  auth: object;
  actionLogOut: Logout;
  signed?: boolean;
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const ProfileIcon = ({ auth, actionLogOut, signed }: IProfile) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event: ButtonEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={auth?.["payload"]?.["login"] || "Profile"}
            src={
              auth?.["payload"]?.["pictureUrl"] ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {signed ? (
          <div>
            <MenuItem onClick={() => history.push("/profile")}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={() => history.push("/settings")}>
              <Typography textAlign="center">Settings</Typography>
            </MenuItem>
            <hr />
            <MenuItem onClick={() => actionLogOut()}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => history.push("/signin")}>
              <Typography textAlign="center">Sign In</Typography>
            </MenuItem>
            <MenuItem onClick={() => history.push("/signup")}>
              <Typography textAlign="center">Sign Up</Typography>
            </MenuItem>
          </div>
        )}
      </Menu>
    </Box>
  );
};

export const CProfileIcon = connect(
  (state: RootState) => ({ auth: state.auth }),
  {
    actionLogOut: actionAuthLogout,
  }
)(ProfileIcon);
