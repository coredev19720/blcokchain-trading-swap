import colors from "@src/themes/colors";
const Checkbox = {
  styleOverrides: {
    root: {
      padding: 0,
      color: colors.mn50,
      "&:hover": {
        backgroundColor: colors.ln30,
      },
      "&.Mui-checked": {
        color: colors.sb60,
        backgroundColor: colors.ln30,
      },
      "&.Mui-disabled": {
        "& .MuiSvgIcon-root": {
          color: "#e0e0e0",
        },
      },
      "& .MuiSvgIcon-root": {
        width: 22,
        height: 22,
      },
    },
  },
};
export default Checkbox;
