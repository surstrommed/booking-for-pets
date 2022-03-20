import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { CProfileIcon } from "./ProfileIcon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSmallHeader,
  actionBigHeader,
  actionExpandSmallHeader,
} from "./../../actions/types";
import { headerBar } from "./headerStyles";

const pages = ["Products", "Pricing", "Blog"];
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const ElevationScroll = (props: Props) => {
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

export default function HeaderBar(props: Props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const smallHeader = useSelector((state) => state.header.smallHeader);
  const bigHeader = useSelector((state) => state.header.bigHeader);
  const expandSmallHeader = useSelector(
    (state) => state.header.expandSmallHeader
  );
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

  return (
    <div className="Header">
      <ElevationScroll {...props}>
        <AppBar>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={headerBar.typography}
              >
                <Link
                  className="Logo"
                  to="/"
                  onClick={() => window.scrollTo(0, 0)}
                >
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
                <Link
                  className="Logo"
                  to="/"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <PetsIcon />
                  Shaggy tail
                </Link>
              </Typography>
              <Box sx={headerBar.searchBox}>
                {smallHeader ? (
                  location === "/" ? (
                    <Button
                      className="SearchField"
                      variant="contained"
                      endIcon={<SearchIcon id="SearchIcon" />}
                      onClick={() => expandMenu()}
                    >
                      Start your search
                    </Button>
                  ) : null
                ) : (
                  <div>
                    <Button>Search</Button>
                    <hr style={headerBar.searchLine} />
                  </div>
                )}
              </Box>
              <Box sx={headerBar.searchFields}>
                {bigHeader || expandSmallHeader ? (
                  <SearchBar
                    styles={
                      bigHeader
                        ? { border: "1px solid black" }
                        : { border: "1px solid grey", borderRadius: "35px" }
                    }
                  />
                ) : null}
              </Box>
              <Button sx={headerBar.ownerButton}>
                <Link to="/owners" onClick={() => window.scrollTo(0, 0)}>
                  For owners
                </Link>
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
