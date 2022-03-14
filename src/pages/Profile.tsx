import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../components/App";
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
import { actionFullUpdate } from "../actions/thunks";

interface ProfileFormValues {
  email: string;
  login: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email"),
  login: Yup.string()
    .min(3, "Login must be at least 3 characters long")
    .max(8, "Login must be maximum 8 characters long"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required(),
});

const Profile = ({ auth, onUpdate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: ProfileFormValues = {
    email: auth["payload"]["email"],
    login: auth["payload"]["login"],
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onUpdate(
        auth["payload"]["id"],
        values.email,
        values.login,
        values.password
      );
    },
  });

  return (
    <div className="profilePage">
      <Typography variant="h4" gutterBottom component="div">
        Personal data:
      </Typography>
      <hr />
      <Typography variant="body1" gutterBottom>
        To change the data, enter a new value in one of the fields and click
        Save to update your data.
      </Typography>
      <form className="profileForm" onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <br />
        <TextField
          id="login"
          name="login"
          label="Your login"
          value={formik.values.login}
          onChange={formik.handleChange}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
        <br />
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          textAlign="center"
        >
          Confirm your password to change user data
        </Typography>
        <TextField
          id="password"
          name="password"
          label="Your password"
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            initialValues.email === formik.values.email &&
            initialValues.login === formik.values.login
          }
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export const CProfile = connect((state: RootState) => ({ auth: state.auth }), {
  onUpdate: actionFullUpdate,
})(Profile);
