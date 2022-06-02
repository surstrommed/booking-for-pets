import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Dropzone } from "./../Auxiliary/Dropzone";
import { changeProfileStyles } from "./profileStyles";
import { links, sendSnackBarMessages } from "../../helpers/consts";
import { Badge, IconButton, Card, CardActions } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import useSnackBar from "../Auxiliary/SnackBar";
import { formateUser, updateJwtToken } from "../../helpers/functions";
import { getImageLink } from "../../server/api/api";
import { usersAPI } from "../../store/reducers/UserService";
import { Preloader } from "../Auxiliary/Preloader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { authAPI } from "../../store/reducers/AuthService";

export const ChangeAvatar = () => {
  const currentUser = formateUser();

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [avatar, setAvatar] = useState(currentUser?.pictureUrl);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [, sendSnackbar] = useSnackBar();

  const [updateUser, { isLoading, error }] = usersAPI.useUpdateUserMutation();

  const [signin, { error: signInError }] = authAPI.useSigninMutation();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleImageUpload = async (file: File) => {
    let url: string;
    try {
      url = await getImageLink(file);
      setUploadedImageUrl(url);
    } catch (e) {
      error.data = e.message;
    }
  };

  const handleSetImage = async () => {
    const signInCheck = await signin({ email: currentUser?.email, password });
    if (signInCheck?.error) {
      return;
    } else {
      const modifiedUser = {
        ...currentUser,
        password,
        pictureUrl: uploadedImageUrl,
      };
      const response = await updateUser(modifiedUser);
      if ("data" in response && !("error" in response)) {
        updateJwtToken({ ...response?.data, password });
        setAvatar(uploadedImageUrl);
        setPassword("");
        setUploadedImageUrl("");
      }
      if (typeof sendSnackbar === "function") {
        sendSnackbar({
          msg: sendSnackBarMessages.changedAvatarMessage(),
          variant: "success",
        });
      }
    }
  };

  const handleDeleteImage = async () => {
    const signInCheck = await signin({ email: currentUser?.email, password });
    if (signInCheck?.error) {
      return;
    } else {
      const modifiedUser = {
        ...currentUser,
        password,
        pictureUrl: null,
      };
      const response = await updateUser(modifiedUser);
      if ("data" in response && !("error" in response)) {
        updateJwtToken(response?.data);
        setAvatar(null);
        setPassword("");
        setUploadedImageUrl("");
      }
      if (typeof sendSnackbar === "function") {
        sendSnackbar({
          msg: sendSnackBarMessages.removedAvatarMessage(),
          variant: "error",
        });
      }
    }
  };

  return (
    <Preloader isLoading={isLoading} error={signInError?.data || error?.data}>
      <Card sx={changeProfileStyles.avatarCard}>
        {avatar || uploadedImageUrl ? (
          <Badge
            overlap="circular"
            sx={changeProfileStyles.avatarBadge}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={
              <IconButton
                onClick={handleDeleteImage}
                disabled={!password?.length || !!uploadedImageUrl?.length}
              >
                <CancelIcon />
              </IconButton>
            }
          >
            <Box
              component="img"
              sx={changeProfileStyles.avatarImage}
              alt="Avatar image"
              src={uploadedImageUrl || avatar}
            />
          </Badge>
        ) : (
          <Box
            component="img"
            sx={changeProfileStyles.avatarImage}
            alt="Avatar image"
            src={links.noAvatar}
          />
        )}
        <CardActions>
          <Dropzone
            type="image"
            limit={1}
            text={"Drag and drop image here for change your avatar"}
            handleImageUpload={handleImageUpload}
          />
        </CardActions>
      </Card>
      <TextField
        id="avatarPassword"
        label="Confirm password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        color="secondary"
        fullWidth
        sx={changeProfileStyles.passwordFormField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle retry password visibility"
                onClick={handleShowPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="caption" display="block" align="center" gutterBottom>
        Upload an image and enter your current password to change your avatar
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={changeProfileStyles.saveButton}
        disabled={!uploadedImageUrl?.length || !password?.length}
        onClick={handleSetImage}
      >
        Set image
      </Button>
    </Preloader>
  );
};
