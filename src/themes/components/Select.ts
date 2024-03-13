import colors from "@src/themes/colors";

const Select = {
  styleOverrides: {
    root: {
      "&:hover": {
        "&::before": {
          borderBottom: "none !important",
        },
      },
    },
    select: {
      backgroundColor: "none",
      borderColor: colors.ln30,
      color: colors.mn70,
      fontWeight: 600,
      fontSize: 13,
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
