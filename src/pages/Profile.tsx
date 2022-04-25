import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CChangePassword } from "./../components/Profile/ChangePassword";
import { CChangeAvatar } from "./../components/Profile/ChangeAvatar";
import { CChangePersonalData } from "./../components/Profile/ChangePersonalData";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { connect } from "react-redux";
import { RootState } from "../helpers/types";
import { pagesStyles } from "./pagesStyles";
import { TabPanelProps } from "../server/api/api-models";

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

const Profile = ({ promise }) => {
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
          <Preloader
            promiseName={"uploadAvatar"}
            promiseState={promise}
            sub={<CChangeAvatar />}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Preloader
            promiseName={"signin"}
            promiseState={promise}
            sub={<CChangePersonalData />}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Preloader
            promiseName={"signin"}
            promiseState={promise}
            sub={<CChangePassword />}
          />
        </TabPanel>
      </div>
    </Box>
  );
};

export const CProfile = connect((state: RootState) => ({
  promise: state.promise,
}))(Profile);
