import React, { Fragment, useEffect, useState } from "react";
import { SnackbarKey, useSnackbar, VariantType } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const useSnackBar = () => {
  const [conf, setConf] = useState({ msg: "", variant: "" });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key: SnackbarKey) => {
    const closeBar = () => {
      closeSnackbar(key);
    };
    return (
      <Fragment>
        <IconButton onClick={closeBar}>
          <CloseIcon />
        </IconButton>
      </Fragment>
    );
  };

  useEffect(() => {
    if (conf.msg) {
      let variant: VariantType = "success";
      if (conf.variant) {
        variant = conf.variant as VariantType;
      }
      enqueueSnackbar(conf.msg, {
        variant,
        autoHideDuration: 3000,
        action,
      });
    }
  }, [conf]);

  return [conf, setConf];
};

export default useSnackBar;
