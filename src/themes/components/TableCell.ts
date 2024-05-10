import colors from "@src/themes/colors";
import breakpoints from "@src/themes/breakpoints";

const TableCell = {
  styleOverrides: {
    head: {
      backgroundColor: colors.sb60,
    },
    root: {
      fontSize: "unset",
      lineHeight: "unset",
      padding: "8px 16px",
      // border: `1px solid ${colors.ln10}`,
      [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
        padding: "4px 8px",
      },
      [`@media screen and (max-width: ${breakpoints.lg}px)`]: {},
    },
  },
};

export default TableCell;
