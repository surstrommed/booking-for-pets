import * as Yup from "yup";
import {
  validatePassword,
  validateLogin,
  validateFirstName,
  validateLastName,
} from "./index";

export const signUpVS = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  login: Yup.string()
    .matches(
      validateLogin,
      "Login must be 3 to 8 characters long and must contain small letters and numbers"
    )
    .required("Login is required"),
  firstName: Yup.string()
    .matches(
      validateFirstName,
      "First name must be 2 to 15 characters long and must start with a capital letter"
    )
    .required("First name is required"),
  lastName: Yup.string()
    .matches(
      validateLastName,
      "Last name must be 2 to 20 characters long and must start with a capital letter"
    )
    .required("Last name is required"),
  password: Yup.string()
    .matches(
      validatePassword,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required"),
  retryPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Retry password is required"),
});

export const signInVS = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const hotelPageVS = Yup.object().shape({
  dateArrival: Yup.date().required("Arrival date is required"),
  dateDeparture: Yup.date().required("Departure date is required"),
  numberAnimals: Yup.number().required("Animals number is required"),
});

export const changePasswordVS = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  retryPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .matches(
      validatePassword,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});

export const changePersonalDataVS = Yup.object().shape({
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
  .required("Password is required"),
});
