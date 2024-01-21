import colors from "../colors";
import { PaletteMode } from "@mui/material";

const palette = {
  primary: {
    main: colors.sb80,
    light: colors.sb70,
    dark: colors.sb90,
  },
  secondary: {
    main: colors.mn10,
    light: colors.ln50,
    dark: colors.mn20,
  },
  info: {
    main: colors.sb40,
    light: colors.sb40,
    dark: colors.sb40,
  },
  success: {
    main: colors.sg50,
    light: colors.sg50,
    dark: colors.sg50,
  },
  warning: {
    main: colors.sy50,
    light: colors.sy50,
    dark: colors.sy50,
  },
  error: {
    main: colors.sr60,
    light: colors.sr50,
    dark: colors.sr70,
  },
  text: {
    info: colors.sb60,
    primary: colors.dn30,
    secondary: colors.mn70,
    warning: colors.sy60,
    success: colors.sg70,
    error: colors.sr60,
    colorPrimary: colors.p100,
    white: colors.p300,
    up: colors.lightUpText,
    ref: colors.lightRefText,
    down: colors.lightDownText,
    ceil: colors.lightCeilText,
    floor: colors.lightFloorText,
  },
  background: {
    paper: colors.p300,
    backdrop: "rgba(0,0,0,0.5)",
  },
  mode: "light" as PaletteMode,
};

export default palette;
