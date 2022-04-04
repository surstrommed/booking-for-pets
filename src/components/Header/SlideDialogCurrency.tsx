import React, { useState, useEffect, forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { RootState } from "../App";
import { connect, useSelector } from "react-redux";
import { Preloader } from "./../Auxiliary/Preloader";
import { actionChooseCurrency } from "./../../actions/thunks";
import { dialogCurrencyStyles } from "./headerStyles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function tabsProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={dialogCurrencyStyles.tab}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function BasicTabs({ auth, currencyList, chooseCurrency }) {
  const currencySiteList = currencyList?.currency;
  const currentCurrency = (currencySiteList || []).find(
    (currency) => auth?.payload?.currency === currency?.id
  );
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={dialogCurrencyStyles.tabBoxWidth}>
      <Box sx={dialogCurrencyStyles.tabBoxMain}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Currency" {...tabsProps(0)} />
          <Tab label="Language" {...tabsProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography variant="h5" gutterBottom component="div">
          Choose a currency
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          Selected: {currentCurrency?.sign}
        </Typography>
        <div style={dialogCurrencyStyles.tabs}>
          {(currencySiteList || []).map((currency, index) => (
            <Button
              key={index}
              variant="outlined"
              color="secondary"
              size="large"
              disabled={currentCurrency.id === currency.id}
              sx={{ margin: "0 2vh" }}
              onClick={() => chooseCurrency(currency.id)}
            >
              {currency.name} - {currency.sign}
            </Button>
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h5" gutterBottom component="div">
          Choose a language
        </Typography>
      </TabPanel>
    </Box>
  );
}

const CBasicTabs = connect(
  (state: RootState) => ({
    promise: state.promise,
    auth: state.auth,
    currencyList: state.currencyList,
  }),
  {
    chooseCurrency: actionChooseCurrency,
  }
)(BasicTabs);

export default function SlideDialogCurrency({ updateOpenDialogStatus }) {
  const promise = useSelector((state) => state?.promise);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      updateOpenDialogStatus(true);
    } else {
      updateOpenDialogStatus(false);
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <Preloader
          promiseName={"getCurrency"}
          promiseState={promise}
          sub={<CBasicTabs />}
          modal
        />
      </Dialog>
    </div>
  );
}
