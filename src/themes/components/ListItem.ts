import colors from "@src/themes/colors";

const ListItem = {
  styleOverrides: {
    root: {
      transition: "all 0.3s",
      color: colors.dn30,
      fontSize: "1.4rem",
      background: colors.lightBackground,
      borderRadius: 4,
      "&:hover": {
        background: colors.ln10,
      },
      "&.Mui-selected": {
        background: colors.sb10,
        color: colors.sb60,
        position: "relative",
        "&:before": {
          content: "''",
          position: "absolute",
          left: 0,
          top: 0,
          width: 4,
          height: "100%",
          background: colors.sb50,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
        },
      },
      "@media screen and (max-width: 1024px)": {
        "&.Mui-selected": {
          background: "transparent",
          "&:before": {
            top: "auto",
            width: "100%",
            height: 2,
            bottom: 0,
          },
        },
      },
    },
  },
};
export default ListItem;
