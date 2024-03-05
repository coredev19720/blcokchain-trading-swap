import colors from "@src/themes/colors";

const Switch = {
  styleOverrides: {
    root: {
      background: colors.sg60,
      color: colors.p300,
    },
    switchBase: {
      "&.Mui-checked": {
        color: colors.p300,
      },
    },
  },
};
export default Switch;
