import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../helpers/types";
import { useFormik } from "formik";
import {
  Button,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Card,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { actionFullUserUpdate as onUpdate } from "../../actions/thunks";
import { changeProfileStyles } from "./profileStyles";
import { PersonalDataValues } from "../../server/api/api-models";
import { changePersonalDataVS } from "./../../helpers/validationSchemes";
import useSnackBar from "../Auxiliary/SnackBar";
import { sendSnackBarMessages } from "../../helpers/consts";
import { RESOLVED_PROMISE_STATUS } from "../../helpers/consts";

export const ChangePersonalData = () => {
  const promise = useSelector((state: RootState) => state.promise);
  const auth = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const initialValues: PersonalDataValues = {
    email: promise.signin.payload?.user?.email || auth.payload.email,
    login: promise.signin.payload?.user?.login || auth.payload.login,
    firstName:
      promise.signin.payload?.user?.firstName || auth.payload.firstName,
    lastName: promise.signin.payload?.user?.lastName || auth.payload.lastName,
    password: "",
  };

  const [, sendSnackbar] = useSnackBar();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePersonalDataVS,
    onSubmit: (values) => {
      onUpdate({
        id: auth.payload.id,
        email: values.email,
        login: values.login,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      });
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const showPass = () => setShowPassword(!showPassword);

  const showMessage = () =>
    promise.signin.status === RESOLVED_PROMISE_STATUS &&
    typeof sendSnackbar === "function" &&
    sendSnackbar({
      msg: sendSnackBarMessages.changedPersonalDataMessage(),
      variant: "success",
    });

  const disableSavePDButton =
    initialValues.email === values.email &&
    initialValues.login === values.login &&
    initialValues.firstName === values.firstName &&
    initialValues.lastName === values.lastName;

  return (
    <Card sx={changeProfileStyles.personalDataCard}>
      <Typography variant="body2" gutterBottom>
        To change the data, enter a new value in one of the fields and click
        Save to update your data.
      </Typography>
      <div>
        <form
          onSubmit={handleSubmit}
          style={changeProfileStyles.personalDataForm}
        >
          <TextField
            id="email"
            name="email"
            label="Your email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            color="secondary"
            fullWidth
            sx={changeProfileStyles.personalDataFormField}
          />
          <br />
          <TextField
            id="login"
            name="login"
            label="Your login"
            value={values.login}
            onChange={handleChange}
            error={touched.login && Boolean(errors.login)}
            helperText={touched.login && errors.login}
            color="secondary"
            fullWidth
            sx={changeProfileStyles.personalDataFormField}
          />
          <br />
          <TextField
            id="firstName"
            name="firstName"
            label="Your first name"
            value={values.firstName}
            onChange={handleChange}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            color="secondary"
            fullWidth
            sx={changeProfileStyles.personalDataFormField}
          />
          <br />
          <TextField
            id="lastName"
            name="lastName"
            label="Your last name"
            value={values.lastName}
            onChange={handleChange}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            color="secondary"
            fullWidth
            sx={changeProfileStyles.personalDataFormField}
          />
          <br />
          <TextField
            id="password"
            name="password"
            label="Your password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            color="secondary"
            fullWidth
            sx={changeProfileStyles.personalDataFormField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showPass}
                    onMouseDown={showPass}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="caption"
            display="block"
            align="center"
            gutterBottom
          >
            Confirm your password to change user data
          </Typography>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={changeProfileStyles.saveButton}
            disabled={disableSavePDButton}
            onClick={showMessage}
          >
            Save
          </Button>
        </form>
      </div>
    </Card>
  );
};
