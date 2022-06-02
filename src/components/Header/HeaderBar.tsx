import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { ProfileIcon } from "./ProfileIcon";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { headerBar } from "./headerStyles";
import { ModalWindow } from "./../Auxiliary/ModalWindow";
import { SignIn } from "./../Auth/Signin";
import { SignUp } from "./../Auth/Signup";
import { ElevationScrollProps } from "../../server/api/api-models";
import { ButtonEvent } from "../../helpers/types";
import { SlideDialogCurrency } from "./SlideDialogCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { headerSlice } from "../../store/reducers/HeaderSlice";
import { checkUser, formateUser } from "../../helpers/functions";

const pages = ["For owners"];

const ElevationScroll = (props: ElevationScrollProps) => {
  const location = useLocation().pathname;
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const headerBar = document.getElementsByClassName("Header");
    if (
      headerBar[0].children[0].classList.contains("SmallHeader") &&
      !headerBar[0].children[0].classList.contains("WhiteBigHeader")
    ) {
      dispatch(headerSlice.actions.small());
    }
    if (headerBar[0].children[0].classList.contains("BigHeader")) {
      dispatch(headerSlice.actions.big());
    }
  });

  return location === "/"
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        className: trigger ? "SmallHeader" : "BigHeader",
      })
    : React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        className: "SmallHeader",
      });
};

export const HeaderBar = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openCurrencyModal, setOpenCurrencyModal] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation().pathname;
  const dispatch = useAppDispatch();

  const { smallHeader, bigHeader, expandSmallHeader } = useAppSelector(
    (state) => state.header
  );

  const handleOpenNavMenu = (event: ButtonEvent) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const expandMenu = () => {
    const smallHeader = document.getElementsByClassName("SmallHeader");
    smallHeader[0].classList.add("WhiteBigHeader");
    dispatch(headerSlice.actions.expand());
  };

  document.body.addEventListener("click", (e) => {
    if (
      !(e.target as HTMLHeadingElement).classList[0]
        ?.toLowerCase()
        ?.includes("mui")
    ) {
      const headerBar = document.getElementsByClassName("Header");
      headerBar[0].children[0].classList.remove("WhiteBigHeader");
      dispatch(headerSlice.actions.small());
    }
  });

  const updateCurrencyModal = (value: boolean) => setOpenCurrencyModal(value);

  const updateSignInModal = (value: boolean) => setOpenSignInModal(value);

  const updateSignUpModal = (value: boolean) => setOpenSignUpModal(value);

  const getPageTop = () => window.scrollTo(0, 0);

  return (
    <div className="Header">
      <ElevationScroll {...props}>
        <AppBar>
          {openCurrencyModal && (
            <SlideDialogCurrency updateOpenDialogStatus={updateCurrencyModal} />
          )}
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
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={headerBar.typography}
              >
                <Link className="Logo" to="/" onClick={getPageTop}>
                  <PetsIcon />
                  Shaggy tail
                </Link>
              </Typography>
              <Box sx={headerBar.account}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={headerBar.menuXs}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={headerBar.logoXs}
              >
                <Link className="Logo" to="/" onClick={getPageTop}>
                  <PetsIcon />
                  Shaggy tail
                </Link>
              </Typography>
              <Box sx={headerBar.searchBox}>
                {smallHeader ? (
                  location === "/" && (
                    <Button
                      className="SearchField"
                      variant="contained"
                      endIcon={<SearchIcon id="SearchIcon" />}
                      onClick={expandMenu}
                    >
                      Start your search
                    </Button>
                  )
                ) : (
                  <div>
                    <Button>Search</Button>
                    <hr style={headerBar.searchLine} />
                  </div>
                )}
              </Box>
              <Box sx={headerBar.searchFields}>
                {(bigHeader || expandSmallHeader) && (
                  <SearchBar
                    styles={
                      bigHeader
                        ? { border: "1px solid black" }
                        : { borderRadius: "35px" }
                    }
                  />
                )}
              </Box>
              <Button
                sx={headerBar.headerButtons}
                onClick={() =>
                  checkUser(formateUser())
                    ? navigate("/for-owners")
                    : updateSignInModal(true)
                }
              >
                For owners
              </Button>
              <Button
                sx={headerBar.headerButtons}
                onClick={() =>
                  checkUser(formateUser())
                    ? updateCurrencyModal(true)
                    : updateSignInModal(true)
                }
              >
                <LanguageOutlinedIcon />
              </Button>
              <ProfileIcon />
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </div>
  );
};
