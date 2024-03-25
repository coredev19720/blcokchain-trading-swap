import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import lightPalette from "./lightPalette";
import darkPalette from "./darkPalette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import components from "./components";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: darkPalette,
    },
  },
  typography: { ...typography },
  breakpoints: { values: { ...breakpoints } },
  spacing: 4,
  components: {
    ...components,
  },
});
export default theme;
