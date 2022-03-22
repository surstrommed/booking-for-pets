import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { actionChangePassword } from "./../../actions/thunks";
import ModalWindow from "./../Auxiliary/ModalWindow";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  retryPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Password is required"),
  newPassword: Yup.string()
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});

const ChangePassword = ({ promise, changePassword }) => {
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
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changePassword(values.password, values.newPassword);
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return promise?.["signin"]?.["status"] === "REJECTED" ? (
    <ModalWindow
      title="Error"
      body={promise?.["signin"]?.["error"]?.["message"]}
    />
  ) : (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Your password:
      </Typography>
      <hr />
      <form className="profileForm" onSubmit={handleSubmit}>
        <TextField
          id="password"
          name="password"
          label="Enter current password"
          type={showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle retry password visibility"
                  onClick={() => setShowRetryPassword(!showRetryPassword)}
                  onMouseDown={() => setShowRetryPassword(!showRetryPassword)}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle new password visibility"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  onMouseDown={() => setShowNewPassword(!showNewPassword)}
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
          color="primary"
          style={{ left: 10 }}
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
    </div>
  );
};

export const CChangePassword = connect(
  (state: RootState) => ({ promise: state.promise }),
  {
    changePassword: actionChangePassword,
  }
)(ChangePassword);
