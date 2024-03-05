import colors from "../../colors";
import breakpoints from "@src/themes/breakpoints";

const Tab = {
  styleOverrides: {
    root: {
      fontSize: 14,
      color: colors.mn80,
      padding: 8,
      minWidth: 120,
      fontWeight: 500,
      minHeight: "unset",
      "&.Mui-selected": {
        background: colors.sb10,
        color: colors.sb50,
      },
      [`@media screen and (min-width: ${breakpoints.xxl}px)`]: {
        fontSize: 16,
      },
    },
  },
};

export default Tab;
