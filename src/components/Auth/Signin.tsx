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
import { connect } from "react-redux";
import { RootState } from "../App";
import ModalWindow from "../Auxiliary/ModalWindow";
import { actionFullLogin } from "../../actions/thunks";

interface ILogin {
  promise: object;
  onLogin: (email: string, password: string) => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = ({ promise, onLogin }: ILogin) => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: LoginFormValues = { email: "", password: "" };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onLogin(values.email, values.password);
    },
  });

  return promise?.["signin"]?.["status"] === "REJECTED" ? (
    <ModalWindow
      title="Error"
      body={promise?.["signin"]?.["error"]?.["message"]}
    />
  ) : (
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
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
