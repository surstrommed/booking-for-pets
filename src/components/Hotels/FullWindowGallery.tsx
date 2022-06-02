import React, { useState, useEffect } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { fullWindowStyles } from "./hotelsStyles";
import { Transition } from "../Auxiliary/Transition";

const formatImageSrc = (
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) => {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};

export const FullWindowGallery = ({ updateOpenDialogStatus, gallery }) => {
  interface IGallerryItem {
    featured: boolean;
    img: string;
    title: string;
  }

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
          </Toolbar>
        </AppBar>
        <ImageList sx={fullWindowStyles.imageList} rowHeight={200} gap={1}>
          {gallery.map((item: IGallerryItem, index: number) => {
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
};
