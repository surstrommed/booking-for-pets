import React, { useState } from "react";
import {
  Box,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { connect } from "react-redux";
import { actionAuthLogout } from "../../actions/types";
import { RootState, history } from "../App";
import ModalWindow from "./../Auxiliary/ModalWindow";
import { CSignIn } from "./../Auth/Signin";
import { CSignUp } from "./../Auth/Signup";
import { Preloader } from "./../Auxiliary/Preloader";
import { profileIconStyles } from "./headerStyles";
import { noAvatar } from "../../helpers";

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

  const updateSignInModal = (value) => {
    setOpenSignInModal(value);
  };

  const updateSignUpModal = (value) => {
    setOpenSignUpModal(value);
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
              sub={
                <CSignIn
                  modal
                  signInOpenState={updateSignInModal}
                  signUpOpenState={updateSignUpModal}
                />
              }
              modal
            />
          }
          type={"signin"}
          signInOpenState={updateSignInModal}
        />
      )}
      {openSignUpModal && (
        <ModalWindow
          title={"Sign up"}
          body={
            <Preloader
              promiseName={"signup"}
              promiseState={promise}
              sub={
                <CSignUp
                  modal
                  signInOpenState={updateSignInModal}
                  signUpOpenState={updateSignUpModal}
                />
              }
              modal
            />
          }
          type={"signup"}
          signUpOpenState={updateSignUpModal}
        />
      )}
      <Box sx={profileIconStyles.flexGrow}>
        <Tooltip title="Open profile">
          <IconButton onClick={handleOpenUserMenu} sx={profileIconStyles.main}>
            {auth?.token ? (
              <Badge badgeContent={3} color="error">
                <MenuIcon sx={profileIconStyles.menuIcon} />
                <Avatar
                  src={auth?.payload?.pictureUrl || noAvatar}
                  sx={profileIconStyles.avatarIcon}
                />
              </Badge>
            ) : (
              <>
                <MenuIcon sx={profileIconStyles.menuIcon} />
                <AccountCircleIcon />
              </>
            )}
          </IconButton>
        </Tooltip>
        <Menu
          sx={profileIconStyles.marginProfileMenu}
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
