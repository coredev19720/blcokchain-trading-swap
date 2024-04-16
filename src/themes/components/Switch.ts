import colors from "@src/themes/colors";

const Switch = {
  styleOverrides: {
    root: {
      color: colors.p300,
      height: 28,
      padding: 0,
      width: 50,
    },
    track: {
      height: 28,
      borderRadius: 14,
      background: colors.nb5,
    },
    thumb: {
      height: 28,
      width: 28,
    },
    switchBase: {
      padding: 0,
      height: 28,
      "&.Mui-checked": {
        color: colors.p300,
        transform: "translateX(22px)",
        "&+.MuiSwitch-track": {
          backgroundColor: colors.mn60,
        },
      },
    },
  },
};
export default Switch;
