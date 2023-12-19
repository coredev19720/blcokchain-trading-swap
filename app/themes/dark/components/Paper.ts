import colors from "../../colors";
const Paper = {
  styleOverrides: {
    root: {
      "&.MuiMenu-paper": {
        "& li": {
          color: colors.p300,
          "&:hover": {
            backgroundColor: colors.dn20,
          },
          "&.Mui-selected": {
            backgroundColor: colors.sb100,
          },
        },
      },
    },
  },
};
export default Paper;
