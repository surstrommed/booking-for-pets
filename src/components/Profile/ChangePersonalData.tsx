import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { actionFullUserUpdate } from "../../actions/thunks";
import { changeProfileStyles } from "./profileStyles";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email"),
  login: Yup.string()
    .min(3, "Login must be at least 3 characters long")
    .max(8, "Login must be maximum 8 characters long"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required(),
});

interface PersonalDataValues {
  email: string;
  login: string;
  password: string;
}

const ChangePersonalData = ({ auth, onUpdate }) => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: PersonalDataValues = {
    email: auth.payload.email,
    login: auth.payload.login,
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onUpdate({
        id: auth.payload.id,
        email: values.email,
        login: values.login,
        password: values.password,
      });
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Your personal data:
      </Typography>
      <hr />
      <Typography variant="body1" gutterBottom>
        To change the data, enter a new value in one of the fields and click
        Save to update your data.
      </Typography>
      <form className="profileForm" onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Your email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <br />
        <TextField
          id="login"
          name="login"
          label="Your login"
          value={values.login}
          onChange={handleChange}
          error={touched.login && Boolean(errors.login)}
          helperText={touched.login && errors.login}
        />
        <br />
        <Typography variant="caption" display="block" gutterBottom>
          Confirm your password to change user data
        </Typography>
        <TextField
          id="password"
          name="password"
          label="Your password"
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={changeProfileStyles.saveButton}
          disabled={
            initialValues.email === values.email &&
            initialValues.login === values.login
          }
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export const CChangePersonalData = connect(
  (state: RootState) => ({ auth: state.auth, promise: state.promise }),
  {
    onUpdate: actionFullUserUpdate,
  }
)(ChangePersonalData);
