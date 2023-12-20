import colors from "../../colors";
const Checkbox = {
  styleOverrides: {
    root: {
      color: colors.mn50,
      "&:hover": {
        backgroundColor: colors.dn30,
      },
      "&.Mui-checked": {
        color: colors.sb50,
        backgroundColor: colors.dn30,
      },
      "&:disabled": {
        opacity: 0.5,
      },
      "& .MuiSvgIcon-root": {
        width: 22,
        height: 22,
      },
    },
  },
};
export default Checkbox;
