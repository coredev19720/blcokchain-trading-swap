import colors from "../../colors";

const Select = {
  styleOverrides: {
    select: {
      backgroundColor: "none",
      borderColor: colors.ln30,
      color: colors.dn30,
      "&:hover": {
        color: colors.sge20,
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
