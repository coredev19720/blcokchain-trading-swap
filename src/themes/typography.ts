import breakpoints from "./breakpoints";

const typography = {
  h1: {
    fontSize: "6rem",
    lineHeight: "7rem",
    fontWeight: 700,
  },
  h2: {
    fontSize: "3.4rem",
    lineHeight: "4.1rem",
    fontWeight: 700,
  },
  h3: {
    fontSize: "2.8rem",
    lineHeight: "3.4rem",
    fontWeight: 600,
  },
  h4: {
    fontSize: "2.2rem",
    lineHeight: "2.8rem",
    fontWeight: 500,
  },
  h5: {
    fontSize: "2rem",
    lineHeight: "2.5rem",
    fontWeight: 500,
  },
  h6: {
    fontSize: "1.7rem",
    lineHeight: "2.2rem",
  },
  body1: {
    fontSize: "1.7rem",
    lineHeight: "2.2rem",
  },
  body2: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
  },
  subtitle1: {
    fontSize: "1.3rem",
    lineHeight: "1.8rem",
  },
  subtitle2: {
    fontSize: "1.2rem",
    lineHeight: "1.6rem",
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
