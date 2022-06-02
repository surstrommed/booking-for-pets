import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ChangePassword } from "./../components/Profile/ChangePassword";
import { ChangeAvatar } from "./../components/Profile/ChangeAvatar";
import { ChangePersonalData } from "./../components/Profile/ChangePersonalData";
import { RootState } from "../helpers/types";
import { pagesStyles } from "./pagesStyles";
import { TabPanelProps } from "../server/api/api-models";
import { useSelector } from "react-redux";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function tabsProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const Profile = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={pagesStyles.profile.main}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        textColor="secondary"
        onChange={handleChange}
        sx={pagesStyles.profile.tabs}
      >
        <Tab label="Avatar" {...tabsProps(0)} />
        <Tab label="Personal data" {...tabsProps(1)} />
        <Tab label="Password" {...tabsProps(2)} />
      </Tabs>
      <div style={pagesStyles.profile.tabPanel}>
        <TabPanel value={value} index={0}>
          <ChangeAvatar />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChangePersonalData />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ChangePassword />
        </TabPanel>
      </div>
    </Box>
  );
};
