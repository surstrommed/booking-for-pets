import React, { Fragment, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const useSnackBar = () => {
  const [conf, setConf] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key) => (
    <Fragment>
      <IconButton
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <CloseIcon />
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    if (conf.msg) {
      let variant = "success";
      if (conf.variant) {
        variant = conf.variant;
      }
      enqueueSnackbar(conf.msg, {
        variant: variant,
        autoHideDuration: 3000,
        action,
      });
    }
  }, [conf]);

  return [conf, setConf];
};

export default useSnackBar;
