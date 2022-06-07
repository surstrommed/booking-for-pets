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
import { CustomTextField } from "./../Auxiliary/CustomTextField";
import { authFormStyles, authModalStyles } from "./authStyles";
import { ISignIn, SignInFormValues } from "./../../server/api/api-models";
import { signInVS } from "../../helpers/validationSchemes";
import { useLocation, useNavigate } from "react-router-dom";
import { authAPI } from "../../store/reducers/AuthService";
import { updateJwtToken } from "../../helpers/functions";
import { Preloader } from "../Auxiliary/Preloader";

export const SignIn = ({
  modal,
  signInOpenState,
  signUpOpenState,
  onSubmit,
}: ISignIn) => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: SignInFormValues = { email: "", password: "" };
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [signin, { isLoading, error }] = authAPI.useSigninMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInVS,
    onSubmit: async (values) => {
      const { email, password } = values;
      const response = await signin({ email, password });
      if ("data" in response && !("error" in response)) {
        updateJwtToken({ ...response?.data?.user, password });
      } else {
        return;
      }
      modal && signInOpenState(false);
      (location === "/signin" || location === "/signup") &&
        !modal &&
        navigate("/");
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const showPass = () => setShowPassword(!showPassword);

  const getSignUpModal = () => {
    signInOpenState(false);
    signUpOpenState(true);
  };

  const getSignUp = () => navigate("/signup");

  useEffect(() => {
    if (sessionStorage?.token && modal) {
      signInOpenState(false);
    }
  }, [sessionStorage?.token]);

  return (
    <Preloader isLoading={isLoading} error={error?.data}>
      <div style={modal ? authModalStyles.main : authFormStyles.main}>
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
        <form onSubmit={onSubmit || handleSubmit}>
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
                    <IconButton onClick={showPass}>
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
    </Preloader>
  );
};
