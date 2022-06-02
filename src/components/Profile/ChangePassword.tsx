import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Card,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { changeProfileStyles } from "./profileStyles";
import { changePasswordVS } from "../../helpers/validationSchemes";
import useSnackBar from "../Auxiliary/SnackBar";
import { sendSnackBarMessages } from "../../helpers/consts";
import { RESOLVED_PROMISE_STATUS } from "../../helpers/consts";
import { authAPI } from "../../store/reducers/AuthService";
import { usersAPI } from "../../store/reducers/UserService";
import { formateUser, updateJwtToken } from "../../helpers/functions";
import { Preloader } from "../Auxiliary/Preloader";

export const ChangePassword = () => {
  const currentUser = formateUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showRetryPassword, setShowRetryPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const initialValues = {
    password: "",
    retryPassword: "",
    newPassword: "",
  };

  const [, sendSnackbar] = useSnackBar();

  const [updateUser, { isLoading, isSuccess, error }] =
    usersAPI.useUpdateUserMutation();

  const [signin, { error: signInError }] = authAPI.useSigninMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePasswordVS,
    onSubmit: async (values, { resetForm }) => {
      const signInCheck = await signin({
        email: currentUser?.email,
        password: values.password,
      });
      if (signInCheck?.error) {
        return;
      } else {
        const modifiedUser = {
          ...currentUser,
          password: values.newPassword,
        };
        const response = await updateUser(modifiedUser);
        if ("data" in response && !("error" in response)) {
          updateJwtToken(response?.data);
        }
        if (typeof sendSnackbar === "function") {
          sendSnackbar({
            msg: sendSnackBarMessages.changedPasswordMessage(),
            variant: "success",
          });
        }
        resetForm();
        setShowPassword(false);
        setShowRetryPassword(false);
        setShowNewPassword(false);
      }
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const showPass = () => setShowPassword(!showPassword);

  const showRetryPass = () => setShowRetryPassword(!showRetryPassword);

  const showNewPass = () => setShowNewPassword(!showNewPassword);

  const disableSavePasswordButton =
    !values.password ||
    !values.retryPassword ||
    !values.newPassword ||
    values.password === values.newPassword;

  return (
    <Preloader
      isLoading={isLoading}
      isSuccess={isSuccess}
      error={signInError?.data || error?.data}
    >
      <Card sx={changeProfileStyles.passwordsCard}>
        <Typography variant="body2" gutterBottom>
          To change your password, please enter your current password, repeat it
          and enter the new password you wish to set.
        </Typography>
        <form onSubmit={handleSubmit} style={changeProfileStyles.passwordsForm}>
          <TextField
            id="password"
            name="password"
            label="Enter current password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            color="secondary"
            fullWidth
            sx={changeProfileStyles.passwordFormField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showPass}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <TextField
            id="retryPassword"
            name="retryPassword"
            label="Confirm current password"
            type={showRetryPassword ? "text" : "password"}
            value={values.retryPassword}
            onChange={handleChange}
            error={touched.retryPassword && Boolean(errors.retryPassword)}
            helperText={touched.retryPassword && errors.retryPassword}
            color="secondary"
            fullWidth
            sx={changeProfileStyles.passwordFormField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle retry password visibility"
                    onClick={showRetryPass}
                  >
                    {showRetryPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <TextField
            id="newPassword"
            name="newPassword"
            label="Enter new password"
            type={showNewPassword ? "text" : "password"}
            value={values.newPassword}
            onChange={handleChange}
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
            color="secondary"
            fullWidth
            sx={changeProfileStyles.passwordFormField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={showNewPass}
                  >
                    {showNewPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={changeProfileStyles.saveButton}
            disabled={disableSavePasswordButton}
          >
            Save
          </Button>
        </form>
      </Card>
    </Preloader>
  );
};
