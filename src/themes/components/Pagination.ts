import colors from "@/src/themes/colors";

const Pagination = {
  styleOverrides: {
    root: {
      "& .MuiPaginationItem-root": {
        "&.Mui-selected": {
          backgroundColor: colors.sb60,
        },
      },
    },
  },
};

export default Pagination;
