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
import { CProfileIcon } from "./ProfileIcon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSmallHeader,
  actionBigHeader,
  actionExpandSmallHeader,
} from "./../../actions/types";
import { headerBar } from "./headerStyles";
import SlideDialogCurrency from "./SlideDialogCurrency";
import ModalWindow from "./../Auxiliary/ModalWindow";
import { Preloader } from "./../Auxiliary/Preloader";
import { CSignIn } from "./../Auth/Signin";
import { CSignUp } from "./../Auth/Signup";
import { ElevationScrollProps } from "../../server/api/api-models";

const pages = ["Products", "Pricing", "Blog"];
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const ElevationScroll = (props: ElevationScrollProps) => {
  const location = useLocation().pathname;
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const headerBar = document.getElementsByClassName("Header");
    if (
      headerBar[0].children[0].classList.contains("SmallHeader") &&
      !headerBar[0].children[0].classList.contains("WhiteBigHeader")
    ) {
      dispatch(actionSmallHeader());
    }
    if (headerBar[0].children[0].classList.contains("BigHeader")) {
      dispatch(actionBigHeader());
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

export default function HeaderBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  const smallHeader = useSelector((state) => state.header.smallHeader);
  const bigHeader = useSelector((state) => state.header.bigHeader);
  const expandSmallHeader = useSelector(
    (state) => state.header.expandSmallHeader
  );

  const currentUser = useSelector((state) => state.auth?.payload);
  const promise = useSelector((state) => state.promise);
  const location = useLocation().pathname;
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event: ButtonEvent) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const expandMenu = () => {
    const smallHeader = document.getElementsByClassName("SmallHeader");
    smallHeader[0].classList.add("WhiteBigHeader");
    dispatch(actionExpandSmallHeader());
  };

  document.body.addEventListener("click", (e) => {
    if (!e.target.classList[0]?.toLowerCase()?.includes("mui")) {
      const headerBar = document.getElementsByClassName("Header");
      headerBar[0].children[0].classList.remove("WhiteBigHeader");
      dispatch(actionSmallHeader());
    }
  });

  const updateOpenDialogStatus = (value) => setOpenDialog(value);

  const updateSignInModal = (value) => setOpenSignInModal(value);

  const updateSignUpModal = (value) => setOpenSignUpModal(value);

  const getPageTop = () => window.scrollTo(0, 0);

  return (
    <div className="Header">
      <ElevationScroll {...props}>
        <AppBar>
          {openDialog && (
            <SlideDialogCurrency
              updateOpenDialogStatus={updateOpenDialogStatus}
            />
          )}
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
              <Button sx={headerBar.headerButtons}>
                <Link to="/owners" onClick={getPageTop}>
                  For owners
                </Link>
              </Button>
              <Button
                sx={headerBar.headerButtons}
                onClick={() =>
                  currentUser
                    ? updateOpenDialogStatus(true)
                    : updateSignInModal(true)
                }
              >
                <LanguageOutlinedIcon />
              </Button>
              <CProfileIcon />
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </div>
  );
}
