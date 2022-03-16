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
import { actionFullUpdate } from "../../actions/thunks";
import ModalWindow from "./../Auxiliary/ModalWindow";

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

const ChangePersonalData = ({ auth, promise, onUpdate }) => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: PersonalDataValues = {
    email: auth["payload"]["email"],
    login: auth["payload"]["login"],
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onUpdate({
        id: auth["payload"]["id"],
        email: values.email,
        login: values.login,
        password: values.password,
      });
    },
  });

  return promise?.["signin"]?.["status"] === "REJECTED" ? (
    <ModalWindow
      title="Error"
      body={promise?.["signin"]?.["error"]?.["message"]}
    />
  ) : (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Your personal data:
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
        <Typography variant="caption" display="block" gutterBottom>
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
          style={{ left: 10 }}
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

export const CChangePersonalData = connect(
  (state: RootState) => ({ auth: state.auth, promise: state.promise }),
  {
    onUpdate: actionFullUpdate,
  }
)(ChangePersonalData);
