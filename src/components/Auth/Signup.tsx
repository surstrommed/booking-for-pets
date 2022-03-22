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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return promise?.["signup"]?.["status"] === "REJECTED" ? (
    <ModalWindow
      title="Error"
      body={promise?.["signup"]?.["error"]?.["message"]}
    />
  ) : (
    <div>
      <form className="authForm" id="signUpForm" onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email*"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <br />
        <TextField
          id="login"
          name="login"
          label="Login*"
          value={values.login}
          onChange={handleChange}
          error={touched.login && Boolean(errors.login)}
          helperText={touched.login && errors.login}
        />
        <br />
        <TextField
          id="password"
          name="password"
          label="Password*"
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
          id="retryPassword"
          name="retryPassword"
          label="Retry password*"
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
