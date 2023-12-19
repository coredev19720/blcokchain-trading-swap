import colors from "../../colors";
import breakpoints from "@/app/themes/breakpoints";

const TableCell = {
  styleOverrides: {
    head: {
      padding: "8px 16px",
      backgroundColor: colors.dn20,
    },
    root: {
      padding: "8px 16px",
      border: `1px solid ${colors.dn10}`,
      backgroundColor: "none",
      [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
        padding: "4px 8px",
      },
      [`@media screen and (max-width: ${breakpoints.lg}px)`]: {},
    },
  },
};
export default TableCell;
