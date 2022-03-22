import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { actionFullRegister } from "../../actions/thunks";
import { connect } from "react-redux";
import { RootState } from "../App";
import { validatePassword, validateLogin } from "../../helpers";
import { validationError } from "./../../helpers/index";
import { CustomTextField } from "./../Auxiliary/CustomTextField";
import { authFormStyles, authModalStyles } from "./authStyles";
interface IRegister {
  promise?: object;
  onRegister: (email: string, login: string, password: string) => void;
  modal?: boolean;
}

interface RegisterFormValues {
  email: string;
  login: string;
  password: string;
  retryPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationError("Enter a valid email"))
    .required(validationError("Email is required")),
  login: Yup.string()
    .matches(
      validateLogin,
      validationError(
        "Login must be 3 to 8 characters long and must contain small letters and numbers"
      )
    )
    .required(validationError("Login is required")),
  password: Yup.string()
    .matches(
      validatePassword,
      validationError(
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
    )
    .required(validationError("Password is required")),
  retryPassword: Yup.string()
    .oneOf([Yup.ref("password")], validationError("Passwords do not match"))
    .required(validationError("Retry password is required")),
});

const SignUp = ({ onRegister, modal }: IRegister) => {
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
              variant="filled"
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
              variant="filled"
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
              variant="filled"
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
              variant="filled"
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
            {modal || (
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={authFormStyles.centerText}
              >
                Already have an account?{" "}
                <Button component={Link} to="/signin" color="secondary">
                  Sign In
                </Button>
              </Typography>
            )}
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
