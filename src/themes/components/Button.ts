import colors from "@src/themes/colors";

const Button = {
  styleOverrides: {
    root: {
      fontSize: "1.3rem",
      lineHeight: "1.8rem",
      borderRadius: 8,
      boxShadow: "none",
      height: 40,
      "&:hover": {
        boxShadow: "none",
      },
      textTransform: "none" as const,
    },
    sizeLarge: {
      height: 52,
      fontSize: "1.7rem",
      lineHeight: "2.2rem",
      borderRadius: 12,
    },
    sizeSmall: {
      fontSize: "1.3rem",
      lineHeight: "1.8rem",
      height: 28,
    },
    containedPrimary: {},
    containedSecondary: {
      backgroundColor: colors.ln50,
      color: colors.dn30,
      "&:hover": {
        backgroundColor: colors.mn10,
      },
      "&:active": {
        backgroundColor: colors.mn20,
      },
      "&:disabled": {
        backgroundColor: "rgba(14, 17, 20, 0.12)",
        color: "rgba(14, 17, 20, 0.32)",
      },
    },
    containedSuccess: {
      backgroundColor: colors.sg70,
      color: colors.p300,
      "&:hover": {
        backgroundColor: colors.sg80,
      },
      "&:active": {
        backgroundColor: colors.sg90,
      },
      "&:disabled": {
        backgroundColor: "rgba(14, 17, 20, 0.12)",
        color: "rgba(14, 17, 20, 0.32)",
      },
    },
    containedWarning: {
      backgroundColor: colors.sy60,
      color: colors.p300,
      "&:hover": {
        backgroundColor: colors.sy70,
      },
      "&:active": {
        backgroundColor: colors.sy80,
      },
      "&:disabled": {
        backgroundColor: "rgba(14, 17, 20, 0.12)",
        color: "rgba(14, 17, 20, 0.32)",
      },
    },
    containedError: {
      backgroundColor: colors.sr70,
      color: colors.p300,
      "&:hover": {
        backgroundColor: colors.sr80,
      },
      "&:active": {
        backgroundColor: colors.sr90,
      },
      "&:disabled": {
        backgroundColor: "rgba(14, 17, 20, 0.12)",
        color: "rgba(14, 17, 20, 0.32)",
      },
    },

    // outlined

    outlined: {
      borderWidth: 2,
      "&:hover": {
        borderWidth: 2,
      },
    },
    outlinedInfo: {
      borderColor: colors.ln50,
      color: colors.dn30,
      "&:hover": {
        borderColor: colors.ln40,
      },
      "&:active": {
        borderColor: colors.ln30,
      },
      "&:disabled": {
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: "rgba(255, 255, 255, 0.32)",
      },
    },
    outlinedSecondary: {
      borderColor: colors.ln50,
      color: colors.dn30,
      "&:disabled": {
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: "rgba(255, 255, 255, 0.32)",
      },
    },

    //end button type

    //Start button size

    sizeMedium: {
      padding: "8px 16px",
    },
    outlinedSizeMedium: {
      padding: "6px 14px",
    },
    outlinedSizeSmall: {
      padding: "6px 14px",
    },
  },
};
export default Button;
