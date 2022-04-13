import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
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
import { actionChangePassword } from "./../../actions/thunks";
import { changeProfileStyles } from "./profileStyles";
import { changePasswordVS } from "../../helpers/validationSchemes";

const ChangePassword = ({ changePassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetryPassword, setShowRetryPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const initialValues = {
    password: "",
    retryPassword: "",
    newPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePasswordVS,
    onSubmit: (values) => {
      changePassword(values.password, values.newPassword);
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const showPass = () => setShowPassword(!showPassword);

  const showRetryPass = () => setShowRetryPassword(!showRetryPassword);

  const showNewPass = () => setShowNewPassword(!showNewPassword);

  return (
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
                  onMouseDown={showPass}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          id="password"
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
                  onMouseDown={showRetryPass}
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
          id="password"
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
                  onMouseDown={showNewPass}
                >
                  {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
          disabled={
            !values.password ||
            !values.retryPassword ||
            !values.newPassword ||
            values.password === values.newPassword
          }
        >
          Save
        </Button>
      </form>
    </Card>
  );
};

export const CChangePassword = connect(
  (state: RootState) => ({ promise: state.promise }),
  {
    changePassword: actionChangePassword,
  }
)(ChangePassword);
