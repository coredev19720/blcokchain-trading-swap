import colors from "../../colors";
import breakpoints from "@/src/themes/breakpoints";

const InputBase = {
  styleOverrides: {
    root: {
      background: colors.ln20,
      fontSize: "1.4rem",
      lineHeight: "2.2rem",
      "&:disabled": {
        opacity: 0.5,
      },
      [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
        fontSize: "1.4rem",
        lineHeight: "2.2rem",
      },
      [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
        fontSize: "1.2rem",
        lineHeight: "1.6rem",
      },
      [`@media screen and (max-width: 1024px)`]: {
        fontSize: "1.4rem",
        lineHeight: "2.2rem",
      },
    },
    adornedStart: {
      paddingLeft: "6px !important",
    },
  },
};
export default InputBase;
