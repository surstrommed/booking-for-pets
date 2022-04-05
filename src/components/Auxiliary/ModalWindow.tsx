import React, { useState, useEffect } from "react";
import { Backdrop, Box, Modal, Fade, Typography } from "@mui/material";
import { modalWindowStyles } from "./auxiliaryStyles";

interface IModal {
  title: string;
  body: string | React.ReactElement;
  type: string;
  signInOpenState?: (value: boolean) => void;
  signUpOpenState?: (value: boolean) => void;
}

export default function ModalWindow({
  title,
  body,
  type,
  signInOpenState,
  signUpOpenState,
}: IModal) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      type === "signin" ? signInOpenState(true) : null;
      type === "signup" ? signUpOpenState(true) : null;
    } else {
      type === "signin" ? signInOpenState(false) : null;
      type === "signup" ? signUpOpenState(false) : null;
    }
  }, [open]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalWindowStyles}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="div"
              sx={modalWindowStyles.title}
            >
              {title}
            </Typography>
            <hr />
            <Typography
              id="transition-modal-description"
              sx={modalWindowStyles.body}
            >
              {body}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
