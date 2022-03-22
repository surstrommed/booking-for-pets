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
      <form className="profileForm" onSubmit={formik.handleSubmit}>
        <TextField
          id="password"
          name="password"
          label="Enter current password"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
          value={formik.values.retryPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.retryPassword && Boolean(formik.errors.retryPassword)
          }
          helperText={
            formik.touched.retryPassword && formik.errors.retryPassword
          }
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
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
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
            !formik.values.password ||
            !formik.values.retryPassword ||
            !formik.values.newPassword ||
            formik.values.password === formik.values.newPassword
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
