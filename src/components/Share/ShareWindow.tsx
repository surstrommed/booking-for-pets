import React from "react";
import { Box, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MailIcon from "@mui/icons-material/Mail";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useSnackBar from "./../Auxiliary/SnackBar";
import { shareStyles } from "./shareStyles";
import { sendSnackBarMessages, links } from "../../helpers/consts";
import { useLocation } from "react-router-dom";

export const ShareWindow = () => {
  const location = useLocation();

  const [, sendSnackbar] = useSnackBar();

  return (
    <Box sx={shareStyles.main}>
      <CopyToClipboard text={`${links.serverUrl}${location.pathname}`}>
        <Button
          variant="outlined"
          color="secondary"
          sx={shareStyles.button}
          onClick={() =>
            typeof sendSnackbar === "function" &&
            sendSnackbar({
              msg: sendSnackBarMessages.copiedMessage(),
              variant: "success",
            })
          }
        >
          <ContentCopyIcon />
          &nbsp;&nbsp;Copy link
        </Button>
      </CopyToClipboard>
      <Button
        target={"_blank"}
        href={"mailto: abc@example.com"}
        variant="outlined"
        color="secondary"
        sx={shareStyles.button}
      >
        <MailIcon />
        &nbsp;&nbsp;Email
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={shareStyles.button}
        href={links.facebookLink}
      >
        <FacebookIcon />
        &nbsp;&nbsp;Facebook
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={shareStyles.button}
        href={links.telegramLink(links.serverUrl, location.pathname)}
      >
        <TelegramIcon />
        &nbsp;&nbsp;Telegram
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={shareStyles.button}
        href={links.whatsAppLink(links.serverUrl, location.pathname)}
      >
        <WhatsAppIcon />
        &nbsp;&nbsp;WhatsApp
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={shareStyles.button}
        href={links.twitterLink}
      >
        <TwitterIcon />
        &nbsp;&nbsp;Twitter
      </Button>
    </Box>
  );
};
