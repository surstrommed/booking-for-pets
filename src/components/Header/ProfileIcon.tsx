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
import ModalWindow from "./../Auxiliary/ModalWindow";
import { CSignIn } from "./../Auth/Signin";
import { CSignUp } from "./../Auth/Signup";
import { Preloader } from "./../Auxiliary/Preloader";
import { profileIconStyles } from "./headerStyles";

type Logout = () => object;
interface IProfile {
  auth: object;
  promise: object;
  actionLogOut: Logout;
  signed?: boolean;
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const ProfileIcon = ({ auth, promise, actionLogOut }: IProfile) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const handleOpenUserMenu = (event: ButtonEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {openSignInModal && (
        <ModalWindow
          title={"Sign in"}
          body={
            <Preloader
              promiseName={"signin"}
              promiseState={promise}
              sub={<CSignIn modal />}
              modal
            />
          }
        />
      )}
      {openSignUpModal && (
        <ModalWindow
          title={"Sign up"}
          body={
            <Preloader
              promiseName={"signup"}
              promiseState={promise}
              sub={<CSignUp modal />}
              modal
            />
          }
        />
      )}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open profile">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Badge badgeContent={3} color="error">
              <Button style={profileIconStyles.main}>
                <MenuIcon style={profileIconStyles.iconSize} />
                {auth?.token ? (
                  auth?.payload.pictureUrl ? (
                    <Avatar
                      src={auth?.payload.pictureUrl}
                      style={profileIconStyles.avatarSize}
                    />
                  ) : (
                    <PersonIcon style={profileIconStyles.personSize} />
                  )
                ) : (
                  <AccountCircleIcon
                    style={profileIconStyles.accountCircleSize}
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
                <Typography
                  sx={profileIconStyles.fontWeight}
                  textAlign="center"
                >
                  Notifications
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => history.push("/wishlist")}>
                <Typography
                  sx={profileIconStyles.fontWeight}
                  textAlign="center"
                >
                  Wishlist
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
              <MenuItem onClick={() => setOpenSignInModal(true)}>
                <Typography textAlign="center">Sign In</Typography>
              </MenuItem>
              <MenuItem onClick={() => setOpenSignUpModal(true)}>
                <Typography textAlign="center">Sign Up</Typography>
              </MenuItem>
            </div>
          )}
        </Menu>
      </Box>
    </>
  );
};

export const CProfileIcon = connect(
  (state: RootState) => ({ auth: state.auth, promise: state.promise }),
  {
    actionLogOut: actionAuthLogout,
  }
)(ProfileIcon);
