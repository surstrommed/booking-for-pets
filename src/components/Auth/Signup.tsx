import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { actionFullRegister } from "../../actions/thunks";
import { connect } from "react-redux";
import { RootState } from "../App";
import {
  validatePassword,
  validateLogin,
  validateFirstName,
  validateLastName,
} from "../../helpers";
import { CustomTextField } from "./../Auxiliary/CustomTextField";
import { authFormStyles, authModalStyles } from "./authStyles";
import { history } from "./../App";

interface IRegister {
  promise?: object;
  onRegister: (user: {
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => void;
  modal?: boolean;
  signInOpenState?: (value: boolean) => void;
  signUpOpenState?: (value: boolean) => void;
}

interface RegisterFormValues {
  email: string;
  login: string;
  firstName: string;
  lastName: string;
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
  firstName: Yup.string()
    .matches(
      validateFirstName,
      "First name must be 2 to 15 characters long and must start with a capital letter"
    )
    .required("First name is required"),
  lastName: Yup.string()
    .matches(
      validateLastName,
      "Last name must be 2 to 20 characters long and must start with a capital letter"
    )
    .required("Last name is required"),
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

const SignUp = ({
  onRegister,
  modal,
  signInOpenState,
  signUpOpenState,
}: IRegister) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetryPassword, setShowRetryPassword] = useState(false);
  const initialValues: RegisterFormValues = {
    email: "",
    login: "",
    firstName: "",
    lastName: "",
    password: "",
    retryPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      modal ? signUpOpenState(false) : null;
      const { email, login, firstName, lastName, password } = values;
      onRegister({ email, login, firstName, lastName, password });
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <div style={modal ? authModalStyles.main : authFormStyles.main}>
      <div>
        {modal || (
          <>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={authFormStyles.centerText}
            >
              Sign up
            </Typography>
            <hr />
          </>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={authFormStyles.inputsBox}>
            <CustomTextField
              id="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              variant="outlined"
              color="secondary"
              fullWidth
            />
            <br />
            <CustomTextField
              id="login"
              name="login"
              label="Login"
              value={values.login}
              onChange={handleChange}
              error={touched.login && Boolean(errors.login)}
              helperText={touched.login && errors.login}
              variant="outlined"
              color="secondary"
              fullWidth
            />
            <br />
            <CustomTextField
              id="firstName"
              name="firstName"
              label="First name"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              variant="outlined"
              color="secondary"
              fullWidth
            />
            <br />
            <CustomTextField
              id="lastName"
              name="lastName"
              label="Last name"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              variant="outlined"
              color="secondary"
              fullWidth
            />
            <br />
            <CustomTextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              variant="outlined"
              color="secondary"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
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
            <br />
            <CustomTextField
              id="retryPassword"
              name="retryPassword"
              label="Retry password"
              type={showRetryPassword ? "text" : "password"}
              value={values.retryPassword}
              onChange={handleChange}
              error={touched.retryPassword && Boolean(errors.retryPassword)}
              helperText={touched.retryPassword && errors.retryPassword}
              variant="outlined"
              color="secondary"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle retry password visibility"
                      onClick={() => setShowRetryPassword(!showRetryPassword)}
                      onMouseDown={() =>
                        setShowRetryPassword(!showRetryPassword)
                      }
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
            <Button
              sx={authFormStyles.signButton}
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Sign Up
            </Button>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={authFormStyles.centerText}
            >
              Already have an account?{" "}
              <Button
                onClick={
                  modal
                    ? () => {
                        signInOpenState(true);
                        signUpOpenState(false);
                      }
                    : () => history.push("/signin")
                }
                color="secondary"
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
};

export const CSignUp = connect(
  (state: RootState) => ({ promise: state.promise }),
  {
    onRegister: actionFullRegister,
  }
)(SignUp);
