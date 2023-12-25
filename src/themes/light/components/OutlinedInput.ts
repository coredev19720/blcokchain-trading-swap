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
          background: "transparent",
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
      borderRadius: 4,
      padding: "12px 16px",
      "&:hover": {},
    },
  },
};
export default OutlinedInput;
