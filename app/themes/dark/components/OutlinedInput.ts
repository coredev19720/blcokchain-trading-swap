import colors from "../../colors";
const OutlinedInput = {
  styleOverrides: {
    root: {
      padding: 0,
      "& fieldset": {
        borderColor: colors.dn10,
      },
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.dn10,
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.sb50,
        },
      },
      "&.Mui-error": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.sr50,
        },
      },
    },
    input: {
      height: "unset",
      padding: 8,
      color: colors.p300,
      background: colors.dn30,
      borderRadius: 4,
      "&:hover": {
        backgroundColor: colors.dn20,
      },
    },
  },
};
export default OutlinedInput;
