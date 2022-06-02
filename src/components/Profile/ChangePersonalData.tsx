import React, { useState } from "react";
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
import { formateUser, updateJwtToken } from "../../helpers/functions";
import { usersAPI } from "../../store/reducers/UserService";
import { authAPI } from "../../store/reducers/AuthService";
import { Preloader } from "../Auxiliary/Preloader";

export const ChangePersonalData = () => {
  const currentUser = formateUser();

  const [showPassword, setShowPassword] = useState(false);

  const initialValues: PersonalDataValues = {
    email: currentUser?.email,
    login: currentUser?.login,
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    password: "",
  };

  const [, sendSnackbar] = useSnackBar();

  const [updateUser, { isLoading, error }] = usersAPI.useUpdateUserMutation();

  const [signin, { error: signInError }] = authAPI.useSigninMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePersonalDataVS,
    onSubmit: async (values) => {
      const signInCheck = await signin({
        email: currentUser?.email,
        password: values.password,
      });
      if (signInCheck?.error) {
        return;
      } else {
        const modifiedUser = {
          ...currentUser,
          email: values.email,
          login: values.login,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
        };
        const response = await updateUser(modifiedUser);
        if ("data" in response && !("error" in response)) {
          updateJwtToken({ ...response?.data, password: values?.password });
        }
        if (typeof sendSnackbar === "function") {
          sendSnackbar({
            msg: sendSnackBarMessages.changedPersonalDataMessage(),
            variant: "success",
          });
        }
        values.password = "";
        setShowPassword(false);
      }
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const showPass = () => setShowPassword(!showPassword);

  const disableSavePDButton =
    initialValues.email === values.email &&
    initialValues.login === values.login &&
    initialValues.firstName === values.firstName &&
    initialValues.lastName === values.lastName;

  return (
    <Preloader isLoading={isLoading} error={signInError?.data || error?.data}>
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
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
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
            >
              Save
            </Button>
          </form>
        </div>
      </Card>
    </Preloader>
  );
};
