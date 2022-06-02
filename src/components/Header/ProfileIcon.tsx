import React, { useState, useEffect } from "react";
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
import { ModalWindow } from "./../Auxiliary/ModalWindow";
import { SignIn } from "./../Auth/Signin";
import { SignUp } from "./../Auth/Signup";
import { profileIconStyles } from "./headerStyles";
import { links, privateRoutes } from "../../helpers/consts";
import {
  NotificationModel,
  HotelModel,
  UserRequestModel,
} from "./../../server/api/api-models";
import {
  UNREAD_NOTIFICATION,
  PENDING_REQUEST_MESSAGE,
} from "../../helpers/consts";
import { useNavigate, useLocation } from "react-router-dom";
import { ButtonEvent } from "../../helpers/types";
import { notificationAPI } from "../../store/reducers/NotificationService";
import { formateUser } from "../../helpers/functions";
import { Preloader } from "../Auxiliary/Preloader";
import { hotelAPI } from "../../store/reducers/HotelService";

export const ProfileIcon = () => {
  const currentUser = formateUser();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    const routeCheck = privateRoutes.some((route) => location.includes(route));
    !sessionStorage?.token && routeCheck && navigate("/signin");
  }, [sessionStorage?.token]);

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

  const getUserHotels = () => navigate("/for-owners/hotels");

  const getWishlist = () => navigate("/wishlists");

  const getProfile = () => navigate("/profile");

  const getNotifications = () => navigate("/notifications");

  const goHome = () => navigate("/");

  const openSignIn = () => setOpenSignInModal(true);

  const openSignUp = () => setOpenSignUpModal(true);

  const getLogOut = () => {
    sessionStorage.removeItem("token");
    handleCloseUserMenu();
  };

  const {
    data: allNotifications,
    error: notificationError,
    isLoading: notificationLoading,
  } = notificationAPI.useFetchAllNotificationsQuery("");

  const {
    data: allHotels,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = hotelAPI.useFetchAllHotelsQuery("");

  const unreadUserMessages = (allNotifications || []).filter(
    (notification: NotificationModel) =>
      notification.toId === currentUser?.id &&
      notification.status === UNREAD_NOTIFICATION
  );

  const currentUserHotels = (allHotels || []).filter(
    (hotel: HotelModel) => hotel.owner === currentUser?.id
  );

  const countPendingBookingRequests = (currentUserHotels || []).reduce(
    (total: number, curHotel: HotelModel) =>
      total +
        curHotel?.userRequests?.filter(
          (request: UserRequestModel) =>
            request?.status === PENDING_REQUEST_MESSAGE
        )?.length || 0,
    0
  );

  return (
    <Preloader
      isLoading={hotelsLoading || notificationLoading}
      data={hotelsError?.data || notificationError?.data}
    >
      {openSignInModal && (
        <ModalWindow
          title={"Sign in"}
          body={
            <SignIn
              modal
              signInOpenState={updateSignInModal}
              signUpOpenState={updateSignUpModal}
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
            <SignUp
              modal
              signInOpenState={updateSignInModal}
              signUpOpenState={updateSignUpModal}
            />
          }
          type={"signup"}
          signUpOpenState={updateSignUpModal}
        />
      )}
      <Box sx={profileIconStyles.flexGrow}>
        <Tooltip title="Open profile">
          <IconButton onClick={handleOpenUserMenu} sx={profileIconStyles.main}>
            {!!Object.keys(currentUser)?.length ? (
              <>
                {unreadUserMessages.length > 0 ||
                countPendingBookingRequests > 0 ? (
                  <Badge badgeContent={""} color="warning">
                    <MenuIcon sx={profileIconStyles.menuIcon} />
                    <Avatar
                      src={currentUser?.pictureUrl || links.noAvatar}
                      sx={profileIconStyles.avatarIcon}
                    />
                  </Badge>
                ) : (
                  <>
                    <MenuIcon sx={profileIconStyles.menuIcon} />
                    <Avatar
                      src={currentUser?.pictureUrl || links.noAvatar}
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
          {!!Object.keys(currentUser)?.length ? (
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
              <MenuItem onClick={getLogOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </div>
          ) : location === "/signin" || location === "/signup" ? (
            <div>
              <MenuItem onClick={goHome}>
                <Typography textAlign="center">Go home</Typography>
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
    </Preloader>
  );
};
