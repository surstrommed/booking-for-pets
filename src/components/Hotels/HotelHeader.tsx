import React from "react";
import { Typography } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { hotelPageStyles } from "./hotelsStyle";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import { Link } from "react-router-dom";

export const HotelHeader = ({ currentHotel }) => {
  return (
    <div>
      <Typography variant="h3" gutterBottom component="div">
        {currentHotel?.name}
      </Typography>
      <Typography
        sx={hotelPageStyles.blockInfo}
        variant="overline"
        display="block"
        gutterBottom
      >
        <div>
          <ScrollLink to="reviews" style={hotelPageStyles.link}>
            {currentHotel?.reviews?.length} review(s)
          </ScrollLink>{" "}
          · {currentHotel?.location}
        </div>
        <div style={hotelPageStyles.alignCenter}>
          <Link to="/share" style={hotelPageStyles.link}>
            <span style={hotelPageStyles.alignCenter}>
              <IosShareOutlinedIcon /> Share
            </span>
          </Link>
          <Link to="/save" style={hotelPageStyles.link}>
            <span style={hotelPageStyles.alignCenter}>
              <GradeOutlinedIcon /> Save
            </span>
          </Link>
        </div>
      </Typography>
    </div>
  );
};
