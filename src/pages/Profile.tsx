import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CChangePassword } from "./../components/Profile/ChangePassword";
import { CChangeAvatar } from "./../components/Profile/ChangeAvatar";
import { CChangePersonalData } from "./../components/Profile/ChangePersonalData";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { connect } from "react-redux";
import { RootState } from "../components/App";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const Profile = connect((state: RootState) => ({
  promise: state.promise,
}))(({ promise }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        textColor="secondary"
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: "divider",
          height: "100%",
        }}
      >
        <Tab label="Avatar" {...a11yProps(0)} />
        <Tab label="Personal data" {...a11yProps(1)} />
        <Tab label="Password" {...a11yProps(2)} />
      </Tabs>
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <TabPanel value={value} index={0}>
          <Preloader
            promiseName={"uploadAvatar"}
            promiseState={promise}
            sub={<CChangeAvatar />}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Preloader
            promiseName={"userUpdate"}
            promiseState={promise}
            sub={<CChangePersonalData />}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Preloader
            promiseName={"userUpdate"}
            promiseState={promise}
            sub={<CChangePassword />}
          />
        </TabPanel>
      </div>
    </Box>
  );
});
