import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { connect } from "react-redux";
import { actionAuthLogout } from "../../actions/types";
import { RootState, history } from "../App";
import { theme } from "./../../assets/theme";

type Logout = () => object;
interface IProfile {
  auth: object;
  actionLogOut: Logout;
  signed?: boolean;
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const ProfileIcon = ({ auth, actionLogOut }: IProfile) => {
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
          <Badge badgeContent={17} color="error">
            <Button
              style={{
                color: "grey",
                backgroundColor: theme.palette.primary.light,
                borderRadius: 25,
                border: "1px solid grey",
                height: 40,
              }}
            >
              <MenuIcon style={{ fontSize: "20px" }} />
              {auth?.["token"] ? (
                auth?.["payload"]?.["pictureUrl"] ? (
                  <Avatar
                    src={auth?.["payload"]?.["pictureUrl"]}
                    style={{ marginLeft: "2vh", width: "24px" }}
                  />
                ) : (
                  <PersonIcon style={{ marginLeft: "1vh", fontSize: "32px" }} />
                )
              ) : (
                <AccountCircleIcon
                  style={{ marginLeft: "1vh", fontSize: "32px" }}
                />
              )}
            </Button>
          </Badge>
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
        {sessionStorage.authToken ? (
          <div>
            <MenuItem onClick={() => history.push("/inbox")}>
              <Typography sx={{ fontWeight: "bold" }} textAlign="center">
                Notifications
              </Typography>
            </MenuItem>
            <hr />
            <MenuItem onClick={() => history.push("/profile")}>
              <Typography textAlign="center">Profile</Typography>
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
