import { PaletteMode } from "@mui/material";
import colors from "./colors";
const darkPalette = {
  primary: {
    main: colors.p300,
    light: colors.sb40,
    dark: colors.sb60,
  },
  secondary: {
    main: colors.mn60,
    light: colors.ln50,
    dark: colors.ln50,
  },
  info: {
    main: colors.sb50,
    light: colors.sb40,
    dark: colors.sb60,
  },
  success: {
    main: colors.sg50,
    light: colors.sg40,
    dark: colors.sg60,
  },
  warning: {
    main: colors.sy50,
    light: colors.sy40,
    dark: colors.sy60,
  },
  error: {
    main: colors.sr50,
    light: colors.sr40,
    dark: colors.sr60,
  },
  text: {
    info: colors.p300,
    primary: colors.p300,
    secondary: colors.mn30,
    warning: colors.sy50,
    success: colors.sg50,
    error: colors.sr50,
  },
  background: {
    paper: colors.dn40,
    backdrop: "rgba(255,255,255,0.1)",
  },
  mode: "dark" as PaletteMode,
};

export default darkPalette;
