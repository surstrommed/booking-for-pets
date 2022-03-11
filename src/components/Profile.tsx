import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Menu,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { connect } from "react-redux";
import { actionAuthLogout } from "./../actions/types";

type Logout = () => object;
interface IProfile {
  auth: object;
  actionLogOut: Logout;
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const Profile = ({ auth, actionLogOut }: IProfile) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event: ButtonEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={() => actionLogOut()}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export const CProfile = connect((state) => ({ promise: state.auth }), {
  actionLogOut: actionAuthLogout,
})(Profile);
