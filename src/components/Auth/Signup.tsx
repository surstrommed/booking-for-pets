import React, { useState } from "react";
import { useFormik } from "formik";
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
import { CustomTextField } from "./../Auxiliary/CustomTextField";
import { authFormStyles, authModalStyles } from "./authStyles";
import { signUpVS } from "./../../helpers/validationSchemes";
import { IRegister, RegisterFormValues } from "./../../server/api/api-models";

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
    validationSchema: signUpVS,
    onSubmit: (values) => {
      modal ? signUpOpenState(false) : null;
      onRegister(
        values.email,
        values.login,
        values.firstName,
        values.lastName,
        values.password
      );
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
                onClick={() => {
                  signInOpenState(true);
                  signUpOpenState(false);
                }}
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
