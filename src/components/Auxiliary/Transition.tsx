import React from "react";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const SlideTransition = (
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) => <Slide direction="up" ref={ref} {...props} />;

export const Transition = React.forwardRef(SlideTransition);
