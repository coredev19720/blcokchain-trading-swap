import colors from "@src/themes/colors";
const MenuItem = {
  styleOverrides: {
    root: {
      fontSize: 13,
      minHeight: "unset",
      lineHeight: "18px",
      "&:hover": {
        color: colors.mn70,
        backgroundColor: colors.sb20,
        "&:before": {
          borderBottom: "none",
        },
      },
    },
  },
};
export default MenuItem;
