import colors from "../../colors";
import breakpoints from "@/app/themes/breakpoints";

const Button = {
  styleOverrides: {
    root: {
      fontSize: "1.6rem",
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
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
    //start button type
    //contained
    containedPrimary: {
      backgroundColor: colors.sb50,
      color:colors.p300,
      "&:hover": {
        backgroundColor: colors.sb70,
      },
      "&:active": {
        backgroundColor: colors.sb80,
      },
      "&:disabled": {
        backgroundColor: colors.sb60,
        opacity: 0.5,
      },
    },
    containedSecondary: {
      backgroundColor: colors.dn10,
      color: colors.p300,
      "&:hover": {
        backgroundColor: colors.dn30,
      },
      "&:active": {
        backgroundColor: colors.mn40,
      },
      "&:disabled": {
        backgroundColor: colors.mn40,
        color: colors.p300,
        opacity: 0.5,
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
        backgroundColor: colors.sg70,
        opacity: 0.5,
      },
    },
    containedWarning: {
      backgroundColor: colors.sy70,
      color: colors.p300,
      "&:hover": {
        backgroundColor: colors.sy80,
      },
      "&:active": {
        backgroundColor: colors.sy90,
      },
      "&:disabled": {
        backgroundColor: colors.sy70,
        opacity: 0.5,
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
        backgroundColor: colors.sr70,
        opacity: 0.5,
      },
    },
    //outline
    outlinedInfo: {
      borderColor: colors.dn20,
      color: colors.p300,
      "&:hover": {
      borderColor: colors.dn20,
      backgroundColor: colors.dn20,
      },
      "&:active": {
        borderColor: colors.dn20,
      },
      "&:disabled": {
        opacity: 0.5,
      },
    },
    outlinedSecondary: {
      borderColor: colors.dn20,
      color: colors.p300,
      "&:disabled": {
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: "rgba(255, 255, 255, 0.32)",
      },
      "&:hover":{
        background:colors.dn20
      }
    },
    //end button type

    sizeMedium: {
      padding: "8px 16px",
    },
    outlinedSizeMedium: {
      padding: "6px 14px",
    },
    sizeSmall: {
      fontSize: "1.4rem",
      lineHeight: "2.2rem",
      padding: "8px 16px",
      [`@media screen and (min-width: ${breakpoints.xxl}px)`]: {
        fontSize: "1.6rem",
        lineHeight: "2.4rem",
      },
      [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
        fontSize: "1.2rem",
        lineHeight: "1.6rem",
      },
      [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
        fontSize: "1rem",
        lineHeight: "1.4rem",
      },
    },
    outlinedSizeSmall: {
      padding: "6px 14px",
    },
  },
}
export default Button