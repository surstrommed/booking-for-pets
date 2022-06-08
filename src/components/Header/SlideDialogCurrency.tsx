import React, { useState, useEffect } from "react";
import { Dialog, Tabs, Tab, Typography, Box, Button } from "@mui/material";
import { Preloader } from "./../Auxiliary/Preloader";
import { dialogCurrencyStyles } from "./headerStyles";
import { TabPanelProps } from "../../server/api/api-models";
import useSnackBar from "./../Auxiliary/SnackBar";
import { sendSnackBarMessages, siteCurrencyList } from "../../helpers/consts";
import { Transition } from "../Auxiliary/Transition";
import { CurrencyModel } from "../../server/api/api-models";
import {
  formateUser,
  setTabsProps,
  updateJwtToken,
} from "../../helpers/functions";
import { usersAPI } from "../../store/reducers/UserService";

const TabPanel = (props: TabPanelProps) => {
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
};

const BasicTabs = () => {
  const currentUser = formateUser();

  const [, sendSnackbar] = useSnackBar();

  const [updateUser, { isLoading: updateUserLoading, error: updateUserError }] =
    usersAPI.useUpdateUserMutation();

  const currentCurrency = (siteCurrencyList || []).find(
    (currency: CurrencyModel) => currentUser?.currencyId === currency?.id
  );
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const selectCurrency = async (currency: CurrencyModel) => {
    const response = await updateUser({
      ...currentUser,
      currencyId: currency.id,
    });

    if (response?.data) {
      updateJwtToken({ ...response?.data, password: currentUser?.password });
    }

    typeof sendSnackbar === "function" &&
      !updateUserError?.data &&
      sendSnackbar({
        msg: sendSnackBarMessages.selectedCurrencyMessage(currency?.name),
        variant: "success",
      });
  };

  return (
    <Preloader isLoading={updateUserLoading} error={updateUserError?.data}>
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
            {(siteCurrencyList || []).map(
              (currency: CurrencyModel, index: number) => (
                <Button
                  key={index}
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled={currentCurrency.id === currency.id}
                  sx={{ margin: "0 2vh" }}
                  onClick={() => selectCurrency(currency)}
                >
                  {currency.name} - {currency.sign}
                </Button>
              )
            )}
          </span>
        </TabPanel>
      </Box>
    </Preloader>
  );
};

export const SlideDialogCurrency = ({ updateOpenDialogStatus }) => {
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
        <BasicTabs />
      </Dialog>
    </div>
  );
};
