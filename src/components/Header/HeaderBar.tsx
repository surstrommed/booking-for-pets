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

const pages = ["Products", "Pricing", "Blog"];
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
let scrollHeader = false;

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const location = useLocation().pathname;
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  useEffect(() => {
    const headerBar = document.getElementsByClassName("Header");
    const searchBar = document.getElementsByClassName("SearchBar");
    if (
      searchBar.length !== 0 &&
      headerBar[0].children[0].classList.contains("SmallHeader")
    ) {
      searchBar[0].style.display = "none";
      scrollHeader = true;
    } else {
      searchBar[0].style.display = "block";
      scrollHeader = false;
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
}

export default function HeaderBar(props: Props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [activeSearch, setActiveSearch] = useState(true);
  const [buttonHover, setButtonHover] = useState(false);

  const handleOpenNavMenu = (event: ButtonEvent) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Link className="Logo" to="/">
                  <PetsIcon />
                  Shaggy tail
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
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
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}
              >
                <Link className="Logo" to="/">
                  <PetsIcon />
                  Shaggy tail
                </Link>
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", marginLeft: "35%" },
                }}
              >
                {scrollHeader ? (
                  <Button
                    style={{ zIndex: 1000 }}
                    variant="contained"
                    endIcon={<SearchIcon />}
                  >
                    Start your search
                  </Button>
                ) : (
                  <div>
                    <Button
                      onClick={() => {
                        setActiveSearch(true);
                      }}
                      onMouseOver={() => setButtonHover(true)}
                      onMouseLeave={() => setButtonHover(false)}
                    >
                      Search
                    </Button>
                    <hr
                      style={{
                        margin: 0,
                        display: activeSearch || buttonHover ? "block" : "none",
                        width: activeSearch
                          ? "30%"
                          : buttonHover
                          ? "10%"
                          : null,
                        marginLeft: activeSearch ? "30%" : "45%",
                      }}
                    />
                  </div>
                )}
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  display: { xs: "none", md: "flex" },
                }}
              >
                {activeSearch ? <SearchBar /> : null}
              </Box>
              <Button
                style={{
                  borderRadius: 25,
                  marginRight: 10,
                }}
              >
                <Link to="/owners">For owners</Link>
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
