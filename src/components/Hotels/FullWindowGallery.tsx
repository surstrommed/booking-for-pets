import React, { useState, forwardRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Link } from "react-router-dom";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import { Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { fullWindowStyles } from "./hotelsStyle";

function srcset(
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullWindowGallery({ updateOpenDialogStatus, gallery }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      updateOpenDialogStatus(true);
    } else {
      updateOpenDialogStatus(false);
    }
  }, [open]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={fullWindowStyles.relativePosition}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIosNewOutlinedIcon />
            </IconButton>
            <Typography
              sx={fullWindowStyles.space}
              variant="h6"
              component="div"
            ></Typography>
            <Link to="/share" style={fullWindowStyles.link}>
              <Typography
                variant="overline"
                gutterBottom
                style={fullWindowStyles.alignCenter}
              >
                <IosShareOutlinedIcon /> Share
              </Typography>
            </Link>
            <Link to="/save" style={fullWindowStyles.link}>
              <Typography
                variant="overline"
                gutterBottom
                style={fullWindowStyles.alignCenter}
              >
                <GradeOutlinedIcon /> Save
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <ImageList sx={fullWindowStyles.imageList} rowHeight={200} gap={1}>
          {gallery.map((item, index) => {
            const cols = item.featured ? 2 : 1;
            const rows = item.featured ? 2 : 1;
            return (
              <ImageListItem key={index} cols={cols} rows={rows}>
                <img
                  {...srcset(item.img, 250, 200, rows, cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Dialog>
    </div>
  );
}
