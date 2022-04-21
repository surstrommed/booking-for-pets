import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import { RootState, history } from "../App";
import { actionFullLogin } from "../../actions/thunks";
import { CustomTextField } from "./../Auxiliary/CustomTextField";
import { authFormStyles, authModalStyles } from "./authStyles";
import { ILogin, LoginFormValues } from "./../../server/api/api-models";
import { signInVS } from "../../helpers/validationSchemes";

const SignIn = ({
  onLogin,
  modal,
  signInOpenState,
  signUpOpenState,
  auth,
}: ILogin) => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: LoginFormValues = { email: "", password: "" };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInVS,
    onSubmit: (values) => {
      modal && signInOpenState(false);
      const { email, password } = values;
      onLogin(email, password);
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const showPass = () => setShowPassword(!showPassword);

  const getSignUpModal = () => {
    signInOpenState(false);
    signUpOpenState(true);
  };

  const getSignUp = () => history.push("/signup");

  useEffect(() => {
    if (auth?.payload && modal) {
      signInOpenState(false);
    }
  }, [auth?.payload]);

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
              Sign in
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
              color="secondary"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              variant="outlined"
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
              fullWidth
              color="secondary"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={showPass}
                      onMouseDown={showPass}
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
            <Button
              sx={
                modal ? authModalStyles.signButton : authFormStyles.signButton
              }
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Sign In
            </Button>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={authFormStyles.centerText}
            >
              Don&apos;t have an account yet?{" "}
              <Button
                onClick={modal ? getSignUpModal : getSignUp}
                color="secondary"
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
};

export const CSignIn = connect((state: RootState) => ({ auth: state.auth }), {
  onLogin: actionFullLogin,
})(SignIn);
