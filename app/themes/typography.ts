import breakpoints from "./breakpoints";

const typography = {
  h1: {
    fontSize: "4rem",
    lineHeight: "6rem",
    fontWeight: 700,
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "3.2rem",
      lineHeight: "5.2rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "2.8rem",
      lineHeight: "4.4rem",
    },
  },
  h2: {
    fontSize: "3.2rem",
    lineHeight: "5.2rem",
    fontWeight: 700,
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "2.8rem",
      lineHeight: "4.4rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "2.4rem",
      lineHeight: "3.6rem",
    },
  },
  h3: {
    fontSize: "2.8rem",
    lineHeight: "4.4rem",
    fontWeight: 600,
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "2.4rem",
      lineHeight: "3.6rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "2rem",
      lineHeight: "3.2rem",
    },
  },
  h4: {
    fontSize: "2.4rem",
    lineHeight: "3.6rem",
    fontWeight: 500,
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "2rem",
      lineHeight: "3.2rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "1.8rem",
      lineHeight: "2.8rem",
    },
  },
  h5: {
    fontSize: "2rem",
    lineHeight: "3.2rem",
    fontWeight: 500,
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "1.8rem",
      lineHeight: "2.8rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "1.6rem",
      lineHeight: "2.4rem",
    },
  },
  h6: {
    fontSize: "1.8rem",
    lineHeight: "2.8rem",
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "1.6rem",
      lineHeight: "2.4rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "1.6rem",
      lineHeight: "2.4rem",
    },
  },
  body1: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "1.4rem",
      lineHeight: "2.2rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
    },
    [`@media screen and (max-width: 1024px)`]: {
      fontSize: "1.4rem",
      lineHeight: "2.2rem",
    },
  },
  body2: {
    fontSize: "1.4rem",
    lineHeight: "2.2rem",
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
    },
  },
  subtitle1: {
    fontSize: "1.2rem",
    lineHeight: "1.6rem",
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
    },
  },
  subtitle2: {
    fontSize: "1.2rem",
    lineHeight: "1.4rem",
    [`@media screen and (max-width: ${breakpoints.xl}px)`]: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
    },
    [`@media screen and (max-width: ${breakpoints.lg}px)`]: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
    },
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  fontFamily: [
    '"Sf-pro-display"',
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
};

export default typography;
