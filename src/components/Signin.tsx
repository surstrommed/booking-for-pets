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
import { actionFullLogin } from "./../actions/thunks";
import { connect } from "react-redux";
import { RootState } from "./App";

interface ILogin {
  promise: object;
  onLogin: (email: string, password: string) => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Enter a valid email"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required(),
});

const SignIn = ({ onLogin }: ILogin) => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: LoginFormValues = { email: "", password: "" };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onLogin(values.email, values.password);
    },
  });

  return (
    <div>
      <form className="authForm" onSubmit={formik.handleSubmit}>
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
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
        <Typography variant="subtitle1" gutterBottom component="div">
          Don&apos;t have an account yet?{" "}
          <Button component={Link} to="/signup" color="secondary">
            Sign Up
          </Button>
        </Typography>
      </form>
    </div>
  );
};

export const CSignIn = connect(
  (state: RootState) => ({ promise: state.promise }),
  {
    onLogin: actionFullLogin,
  }
)(SignIn);
