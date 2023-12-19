import colors from "../../colors";
const Select = {
  styleOverrides: {
    select: {
      backgroundColor: colors.dn30,
      borderColor: colors.dn10,
      color: colors.mn30,
      "&:hover": {
        backgroundColor: colors.dn20,
      },
      "&:focus": {
        borderColor: "transparent",
      },
    },
  },
};
export default Select;
