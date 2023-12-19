import colors from "../../colors";
const Radio =  {
  styleOverrides: {
    root: {
      padding: 0,
      marginRight: 8,
      color: colors.mn50,
      "&:hover": {
        backgroundColor: colors.dn20,
      },
      "&.Mui-checked": {
        color: colors.sb50,
        backgroundColor: colors.darkBackground,
      },
      "&:disabled": {
        opacity: 0.5,
      },
    },
  },
};
export default Radio;
