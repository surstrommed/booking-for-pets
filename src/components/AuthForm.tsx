import React, { useState } from "react";
import {
  Input,
  InputLabel,
  Button,
  FormControl,
  Alert,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateLogin,
} from "./../../helpers/index";
import { actionFullLogin, actionFullRegister } from "./../actions/types";
import { connect } from "react-redux";

type Login = (email: string, password: string) => object;
type Register = (email: string, login: string, password: string) => object;
interface IAuth {
  promise: object;
  onLogin: Login;
  onRegister: Register;
  signup?: boolean;
}

const AuthForm = ({ promise, onLogin, onRegister, signup }: IAuth) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = (type: string) => {
    type === "first"
      ? setShowPassword(!showPassword)
      : setShowRepeatPassword(!showRepeatPassword);
  };

  const clearForm = () => {
    setLogin("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  return (
    <>
      {signup && (email.length === 0 || !validateEmail(email)) ? (
        <Alert severity="error" className="alertError">
          Email must be in the format: email@gmail.com.
        </Alert>
      ) : null}
      {signup && (login.length === 0 || !validateLogin(login)) ? (
        <Alert severity="error" className="alertError">
          Login must be 3 to 8 characters long and contain only letters and
          numbers.
        </Alert>
      ) : null}
      {signup && login.length !== 0 && password !== repeatPassword ? (
        <Alert severity="error" className="alertError">
          Passwords must be repeated.
        </Alert>
      ) : null}
      {signup && (password.length === 0 || !validatePassword(password)) ? (
        <Alert severity="error" className="alertError">
          The password must be at least 6 characters, contain at least one
          number and a capital letter.
        </Alert>
      ) : null}
      <Alert
        severity="error"
        id="signInError"
        style={{ display: "none" }}
        className="alertError"
      >
        Sorry, but the user with the entered data was not found!
      </Alert>
      <Alert
        severity="error"
        id="userExistsError"
        style={{ display: "none" }}
        className="alertError"
      >
        Sorry, but a user with this username or email address already exists!
      </Alert>
      <form className="authForm" id="authForm">
        <FormControl>
          <InputLabel htmlFor="my-email">Your email*</InputLabel>
          <Input
            type="email"
            id="my-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <br />
        {signup ? (
          <>
            <FormControl>
              <InputLabel htmlFor="my-login">Your login*</InputLabel>
              <Input
                id="my-login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </FormControl>
            <br />
          </>
        ) : null}
        <FormControl>
          <InputLabel htmlFor="my-password">Your password*</InputLabel>
          <Input
            id="my-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => handleClickShowPassword("first")}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />{" "}
        </FormControl>
        <br />
        {signup ? (
          <>
            <FormControl>
              <InputLabel htmlFor="my-repeat-password">
                Repeat your password*
              </InputLabel>
              <Input
                id="my-repeat-password"
                type={showRepeatPassword ? "text" : "password"}
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword("second")}
                    >
                      {showRepeatPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br />
          </>
        ) : null}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => clearForm()}
        >
          Cancel
        </Button>{" "}
        {signup ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onRegister(email, login, password)}
              disabled={
                validateEmail(email) &&
                validateLogin(login) &&
                validatePassword(password) &&
                password === repeatPassword
                  ? false
                  : true
              }
            >
              Sign Up
            </Button>
            <Typography variant="subtitle1" gutterBottom component="div">
              Already have an account?{" "}
              <Button component={Link} to="/signin" color="secondary">
                Sign In
              </Button>
            </Typography>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onLogin(email, password)}
              disabled={email && password ? false : true}
            >
              Sign In
            </Button>
            <Typography variant="subtitle1" gutterBottom component="div">
              Don&apos;t have an account yet?{" "}
              <Button component={Link} to="/signup" color="secondary">
                Sign Up
              </Button>
            </Typography>
          </>
        )}
      </form>
    </>
  );
};

export const CAuthForm = connect((state) => ({ promise: state.promise }), {
  onLogin: actionFullLogin,
  onRegister: actionFullRegister,
})(AuthForm);
