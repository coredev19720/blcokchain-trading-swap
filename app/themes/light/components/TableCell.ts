import colors from "../../colors";
import breakpoints from "@/app/themes/breakpoints";

const TableCell = {
  styleOverrides: {
    head: {
      backgroundColor: colors.ln30,
    },
    root: {
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
