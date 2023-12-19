import { createTheme } from '@mui/material/styles';
import palette from "./palette";
import components from "./components";
import typography from "../typography";
import breakpoints from "../breakpoints";

const lightThemes = createTheme({
  typography: { ...typography },
  palette: { ...palette },
  breakpoints: { values: { ...breakpoints } },
  spacing: 4,
  components: { ...components }
});

export default lightThemes;