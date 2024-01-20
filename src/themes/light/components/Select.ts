import colors from "../../colors";

const Select = {
  styleOverrides: {
    select: {
      backgroundColor: colors.ln20,
      borderColor: colors.ln30,
      color: colors.dn30,
      "&:hover": {
        color: colors.sge20,
        backgroundColor: colors.ln20,
      },
      "&:focus": {
        borderColor: "transparent",
      },
    },
    standard: {
      background: "none",
      border: "none",
      "&:before": {
        borderBottom: "none",
      },
      "&:after": {
        borderBottom: "none",
      },
    },
  },
};

export default Select;
