import colors from "../../colors";

const OutlinedInput = {
  styleOverrides: {
    root: {
      padding: 0,
      "& fieldset": {
        borderColor: colors.ln30,
      },
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.sb60,
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.sb60,
        },
      },
      "&.Mui-error": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.sr60,
        },
      },
    },
    input: {
      height: "unset",
      padding: 8,
      color: colors.dn30,
      borderRadius: 4,
      "&:hover": {
        backgroundColor: colors.ln30,
      },
    },
  },
}
export default OutlinedInput;
