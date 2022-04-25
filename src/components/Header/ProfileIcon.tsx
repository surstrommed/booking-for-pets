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
import { history } from "../App";
import { RootState } from "../../helpers/types";
import ModalWindow from "./../Auxiliary/ModalWindow";
import { CSignIn } from "./../Auth/Signin";
import { CSignUp } from "./../Auth/Signup";
import { Preloader } from "./../Auxiliary/Preloader";
import { profileIconStyles } from "./headerStyles";
import { links } from "../../helpers/consts";
import {
  NotificationModel,
  HotelModel,
  UserRequestModel,
} from "./../../server/api/api-models";
import {
  UNREAD_NOTIFICATION,
  PENDING_REQUEST_MESSAGE,
} from "../../helpers/consts";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const ProfileIcon = ({ auth, promise, actionLogOut }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  const handleOpenUserMenu = (event: ButtonEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const updateSignInModal = (value: boolean) => {
    setOpenSignInModal(value);
  };

  const updateSignUpModal = (value: boolean) => {
    setOpenSignUpModal(value);
  };

  const getUserHotels = () => history.push("/for-owners/hotels");

  const getWishlist = () => history.push("/wishlists");

  const getProfile = () => history.push("/profile");

  const getNotifications = () => history.push("/notifications");

  const openSignIn = () => setOpenSignInModal(true);

  const openSignUp = () => setOpenSignUpModal(true);

  const unreadUserMessages = (promise.getNotifications?.payload || []).filter(
    (notification: NotificationModel) =>
      notification.toId === auth?.payload?.id &&
      notification.status === UNREAD_NOTIFICATION
  );

  const currentUserHotels = (promise.getHotels?.payload || []).filter(
    (hotel: HotelModel) => hotel.owner === auth?.payload?.id
  );

  const countPendingBookingRequests = (currentUserHotels || []).reduce(
    (total: number, curHotel: HotelModel) =>
      total +
      curHotel.userRequests.filter(
        (request: UserRequestModel) =>
          request.status === PENDING_REQUEST_MESSAGE
      ).length,
    0
  );

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
              <>
                {unreadUserMessages.length > 0 ||
                countPendingBookingRequests > 0 ? (
                  <Badge badgeContent={""} color="warning">
                    <MenuIcon sx={profileIconStyles.menuIcon} />
                    <Avatar
                      src={auth?.payload?.pictureUrl || links.noAvatar}
                      sx={profileIconStyles.avatarIcon}
                    />
                  </Badge>
                ) : (
                  <>
                    <MenuIcon sx={profileIconStyles.menuIcon} />
                    <Avatar
                      src={auth?.payload?.pictureUrl || links.noAvatar}
                      sx={profileIconStyles.avatarIcon}
                    />
                  </>
                )}
              </>
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
              <MenuItem onClick={getUserHotels}>
                <Typography
                  sx={profileIconStyles.fontWeight}
                  textAlign="center"
                >
                  My hotels ({countPendingBookingRequests})
                </Typography>
              </MenuItem>
              <MenuItem onClick={getWishlist}>
                <Typography
                  sx={profileIconStyles.fontWeight}
                  textAlign="center"
                >
                  Wishlists
                </Typography>
              </MenuItem>
              <MenuItem onClick={getNotifications}>
                <Typography
                  sx={profileIconStyles.fontWeight}
                  textAlign="center"
                >
                  Notifications ({unreadUserMessages.length})
                </Typography>
              </MenuItem>
              <hr />
              <MenuItem onClick={getProfile}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <hr />
              <MenuItem onClick={actionLogOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem onClick={openSignIn}>
                <Typography textAlign="center">Sign In</Typography>
              </MenuItem>
              <MenuItem onClick={openSignUp}>
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
