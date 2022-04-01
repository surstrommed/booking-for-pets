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
import Card from "@mui/material/Card";
import {
  validateLogin,
  validateFirstName,
  validateLastName,
  validatePassword,
} from "./../../helpers/index";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email"),
  login: Yup.string().matches(
    validateLogin,
    "Login must be 3 to 8 characters long and must contain small letters and numbers"
  ),
  firstName: Yup.string().matches(
    validateFirstName,
    "First name must be 2 to 15 characters long and must start with a capital letter"
  ),
  lastName: Yup.string().matches(
    validateLastName,
    "Last name must be 2 to 20 characters long and must start with a capital letter"
  ),
  password: Yup.string()
    .matches(
      validatePassword,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required(),
});

interface PersonalDataValues {
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
}

const ChangePersonalData = ({ auth, onUpdate }) => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: PersonalDataValues = {
    email: auth.payload.email,
    login: auth.payload.login,
    firstName: auth.payload.firstName,
    lastName: auth.payload.lastName,
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
    <Card sx={changeProfileStyles.personalDataCard}>
      <Typography variant="body1" gutterBottom>
        To change the data, enter a new value in one of the fields and click
        Save to update your data.
      </Typography>
      <div>
        <form className="profileForm" onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Your email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            color="secondary"
            fullWidth
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
            color="secondary"
            fullWidth
          />
          <br />
          <TextField
            id="firstName"
            name="firstName"
            label="Your first name"
            value={values.firstName}
            onChange={handleChange}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            color="secondary"
            fullWidth
          />
          <br />
          <TextField
            id="lastName"
            name="lastName"
            label="Your last name"
            value={values.lastName}
            onChange={handleChange}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            color="secondary"
            fullWidth
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
            color="secondary"
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
    </Card>
  );
};

export const CChangePersonalData = connect(
  (state: RootState) => ({ auth: state.auth, promise: state.promise }),
  {
    onUpdate: actionFullUserUpdate,
  }
)(ChangePersonalData);
