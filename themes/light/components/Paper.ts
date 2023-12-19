import colors from "../../colors";

const Paper = {
  styleOverrides: {
    root: {
      "&.MuiMenu-paper": {
        "& .MuiMenu-list": {
          backgroundColor: colors.p300,
        },
        "& li": {
          color: colors.dn30,
          "&:hover": {
            backgroundColor: colors.sb20,
          },
          "&.Mui-selected": {
            backgroundColor: colors.ln50,
          },
        },
      },
    },
  },
}
export default Paper;
