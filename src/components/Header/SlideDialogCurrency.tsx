import React, { useState, useEffect } from "react";
import { Dialog, Tabs, Tab, Typography, Box, Button } from "@mui/material";
import { RootState } from "../../helpers/types";
import { connect, useSelector } from "react-redux";
import { Preloader } from "./../Auxiliary/Preloader";
import { actionChooseCurrency } from "./../../actions/thunks";
import { dialogCurrencyStyles } from "./headerStyles";
import { TabPanelProps } from "../../server/api/api-models";
import useSnackBar from "./../Auxiliary/SnackBar";
import { sendSnackBarMessages } from "../../helpers/consts";
import { Transition } from "../Auxiliary/Transition";
import { CurrencyModel } from "../../server/api/api-models";
import { setTabsProps } from "../../helpers/functions";

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
    (currency) => auth?.payload?.currencyId === currency?.id
  );
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [, sendSnackbar] = useSnackBar();

  return (
    <Box sx={dialogCurrencyStyles.tabBoxWidth}>
      <Box sx={dialogCurrencyStyles.tabBoxMain}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Language" {...setTabsProps(0)} />
          <Tab label="Currency" {...setTabsProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography variant="h5" gutterBottom component="span">
          Choose a language
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h5" gutterBottom component="span">
          Choose a currency
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom component="span">
          Selected: {currentCurrency?.sign}
        </Typography>
        <span style={dialogCurrencyStyles.tabs}>
          {(currencySiteList || []).map(
            (currency: CurrencyModel, index: number) => (
              <Button
                key={index}
                variant="outlined"
                color="secondary"
                size="large"
                disabled={currentCurrency.id === currency.id}
                sx={{ margin: "0 2vh" }}
                onClick={() => {
                  chooseCurrency(currency.id);
                  typeof sendSnackbar === "function" &&
                    sendSnackbar({
                      msg: sendSnackBarMessages.selectedCurrencyMessage(
                        currency?.name
                      ),
                      variant: "success",
                    });
                }}
              >
                {currency.name} - {currency.sign}
              </Button>
            )
          )}
        </span>
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
  const promise = useSelector((state: RootState) => state.promise);
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
