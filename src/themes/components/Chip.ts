import colors from "@/src/themes/colors";
const Chip = {
  styleOverrides: {
    root: {
      borderRadius: 4,
      height: "unset",
    },
    label: {
      fontSize: "1.6rem",
      lineHeight: "2.4rem",
      fontWeight: 500,
      padding: 0,
    },
    colorDefault: {
      color: colors.sb60,
    },
    outlinedDefault: {
      background: colors.ln30,
      borderColor: colors.ln50,
    },
    colorSuccess: {
      color: colors.sg70,
    },
    outlinedSuccess: {
      background: colors.sg10,
      borderColor: colors.sg70,
    },
    colorWarning: {
      color: colors.sy50,
    },
    outlinedWarning: {
      background: colors.sy10,
      borderColor: colors.sy50,
    },
    colorError: {
      color: colors.sr60,
    },
    outlinedError: {
      background: colors.sr10,
      borderColor: colors.sr60,
    },
  },
};
export default Chip;
