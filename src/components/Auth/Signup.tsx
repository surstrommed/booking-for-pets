import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { actionFullRegister } from "../../actions/thunks";
import { connect } from "react-redux";
import { RootState } from "../App";
import ModalWindow from "./../Auxiliary/ModalWindow";
import { validatePassword, validateLogin } from "../../helpers";

interface IRegister {
  promise: object;
  onRegister: (email: string, login: string, password: string) => void;
}

interface RegisterFormValues {
  email: string;
  login: string;
  password: string;
  retryPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  login: Yup.string()
    .matches(
      validateLogin,
      "Login must be 3 to 8 characters long and must contain small letters and numbers"
    )
    .required("Login is required"),
  password: Yup.string()
    .matches(
      validatePassword,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required"),
  retryPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Retry password is required"),
});

const SignUp = ({ promise, onRegister }: IRegister) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetryPassword, setShowRetryPassword] = useState(false);
  const initialValues: RegisterFormValues = {
    email: "",
    login: "",
    password: "",
    retryPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onRegister(values.email, values.login, values.password);
    },
  });

  return promise?.["signup"]?.["status"] === "REJECTED" ? (
    <ModalWindow
      title="Error"
      body={promise?.["signup"]?.["error"]?.["message"]}
    />
  ) : (
    <div>
      <form className="authForm" id="signUpForm" onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email*"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <br />
        <TextField
          id="login"
          name="login"
          label="Login*"
          value={formik.values.login}
          onChange={formik.handleChange}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
        <br />
        <TextField
          id="password"
          name="password"
          label="Password*"
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
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          id="retryPassword"
          name="retryPassword"
          label="Retry password*"
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
                  {showRetryPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
        <Typography variant="subtitle1" gutterBottom component="div">
          Already have an account?{" "}
          <Button component={Link} to="/signin" color="secondary">
            Sign In
          </Button>
        </Typography>
      </form>
    </div>
  );
};

export const CSignUp = connect(
  (state: RootState) => ({ promise: state.promise }),
  {
    onRegister: actionFullRegister,
  }
)(SignUp);
