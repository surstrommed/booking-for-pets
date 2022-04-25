export const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const validatePassword =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const validateLogin = /^[a-z0-9]{3,8}$/;

export const validateFirstName = /^([A-Z]{1}[a-z]{2,14})$/;

export const validateLastName = /^([A-Z]{1}[a-z]{2,19})$/;

export const validateWishlistName = /^([a-zA-Z0-9]{2,20})$/;
