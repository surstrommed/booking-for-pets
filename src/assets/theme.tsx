import { createTheme } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      light: "#fff",
    },
    secondary: {
      main: indigo[400],
    },
  },
});
