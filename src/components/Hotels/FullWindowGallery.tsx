import React, { useState, forwardRef, useEffect } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  Typography,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { Link } from "react-router-dom";
import { fullWindowStyles } from "./hotelsStyle";

function formatImageSrc(
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
                  {...formatImageSrc(item.img, 250, 200, rows, cols)}
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
