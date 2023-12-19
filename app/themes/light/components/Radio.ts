import colors from "../../colors";

const Radio =  {
  styleOverrides: {
    root: {
      padding: 0,
      marginRight: 8,
      color: colors.mn50,
      "&:hover": {
        backgroundColor: colors.ln30,
      },
      "&.Mui-checked": {
        color: colors.sb60,
        backgroundColor: colors.lightBackground,
      },
      "&:disabled": {
        opacity: 0.5,
      },
    },
  },
}

export default Radio;
