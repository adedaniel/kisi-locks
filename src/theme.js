import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    primary: {
      main: "#4a52ff",
    },
    secondary: {
      main: "#222647",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
