import { createTheme } from '@mui/material/styles';
import typography from "../typography";
import breakpoints from "../breakpoints";
import palette from "./palette";
import components from "./components";

const darkThemes = createTheme({
  typography: { ...typography },
  palette: { ...palette },
  breakpoints: { values: { ...breakpoints } },
  spacing: 4,
  components: { ...components },
});

export default darkThemes;
