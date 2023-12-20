import colors from "../../colors";

const Pagination = {
  styleOverrides: {
    root: {
      "& .MuiPaginationItem-root": {
        "&.Mui-selected": {
          backgroundColor: colors.sb60
        }
      }
    },
  },
};

export default Pagination;
