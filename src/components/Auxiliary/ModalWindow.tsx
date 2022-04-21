import React, { useState, useEffect } from "react";
import { Backdrop, Box, Modal, Fade, Typography } from "@mui/material";
import { modalWindowStyles } from "./auxiliaryStyles";
import { IModal } from "../../server/api/api-models";

export default function ModalWindow({
  title,
  body,
  type,
  signInOpenState,
  signUpOpenState,
  modalWindowState,
}: IModal) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      type === "signin" && signInOpenState(true);
      type === "signup" && signUpOpenState(true);
      modalWindowState && modalWindowState(true);
    } else {
      type === "signin" && signInOpenState(false);
      type === "signup" && signUpOpenState(false);
      modalWindowState && modalWindowState(false);
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
            {typeof body === "string" ? (
              <Typography
                id="transition-modal-description"
                sx={modalWindowStyles.body}
              >
                {body}
              </Typography>
            ) : (
              <>{body}</>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
