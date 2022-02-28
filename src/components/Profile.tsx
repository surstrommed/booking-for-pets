import React, { Component } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const settings = ["Profile", "Settings", "Logout"];
interface ProfileState {
  anchorElUser: null;
}

export class Profile extends Component<{}, ProfileState> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorElUser: null,
    };
  }
  handleOpenUserMenu = (event: any) => {
    this.setState({
      anchorElUser: event.currentTarget,
    });
  };
  handleCloseUserMenu = (event: any) => {
    this.setState({
      anchorElUser: null,
    });
  };
  public render(): JSX.Element {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={this.state.anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(this.state.anchorElUser)}
          onClose={this.handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={this.handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }
}
