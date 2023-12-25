import colors from "../../colors";
import breakpoints from "@/src/themes/breakpoints";

const InputBase = {
  styleOverrides: {
    root: {
      background: colors.p300,
      padding: "12px 16px",
      borderRadius: 8,
      fontSize: "1.4rem",
      lineHeight: "2.2rem",
      "&:disabled": {
        opacity: 0.5,
      },
    },
    adornedStart: {
      paddingLeft: "6px !important",
    },
  },
};
export default InputBase;
