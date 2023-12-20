import colors from "../../colors";
import breakpoints from "@/src/themes/breakpoints";

const Alert = {
  styleOverrides: {
    root: {
      backgroundColor: colors.p300,
      boxShadow: "0px 4px 12px rgba(55, 66, 77, 0.2)",
      fontSize: "1.6rem",
      lineHeight: "2.4rem",
      color: colors.mn100,
      "& .MuiAlertTitle-root": {
        fontWeight: 600,
      },
      "& .MuiIconButton-root": {
        color: colors.mn100,
        "& .MuiSvgIcon-root": {
          fontSize: "1.6rem",
        },
      },
      [`@media screen and (min-width: ${breakpoints.xxl}px)`]: {
        fontSize: "1.8rem",
        lineHeight: "2.8rem",
      },
      [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
        fontSize: "1.4rem",
        lineHeight: "2.2rem",
      },
      [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
        fontSize: "1.2rem",
        lineHeight: "1.6rem",
      },
      [`@media screen and (max-width: 1024px)`]: {
        fontSize: "1.4rem",
        lineHeight: "2.2rem",
      },
    },
    icon: {
      marginRight: "1.6rem",
    },
  },
};
export default Alert;
