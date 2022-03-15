import { createTheme } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: indigo[50],
    },
    secondary: {
      main: indigo[400],
    },
  },
});
