import React from "react";
import { hotelPageStyles } from "./hotelsStyle";
import { ImageList, ImageListItem, Button } from "@mui/material";

export const HotelGallery = ({ currentHotel, updateOpenDialogStatus }) => {
  function formatImageSrc(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  const hotelPhotos = (currentHotel?.photos || []).map((photo, index) => ({
    img: photo,
    title: `Photo ${index + 1}`,
    rows: index === 0 ? 2 : null,
    cols: index === 0 ? 2 : null,
  }));

  const cutHotelPhotos = hotelPhotos.slice(0, 5);

  return (
    <div>
      <ImageList sx={hotelPageStyles.gallery} cols={4}>
        {cutHotelPhotos.map((item, index) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...formatImageSrc(item.img, 50, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
            {index === 4 && (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={hotelPageStyles.submitButton}
                onClick={() => updateOpenDialogStatus(true)}
              >
                Show more
              </Button>
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
