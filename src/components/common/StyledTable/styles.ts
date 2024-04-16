import colors from "@src/themes/colors";
import { styled } from "@mui/system";
import { TableContainer } from "@mui/material";
interface HeaderWrapperProps {
  isSort?: boolean;
}
export const TableWrapper = styled(TableContainer)({
  scrollbarWidth: "thin",
  boxShadow: "none",
  // "& .MuiTableBody-root": {
  //   "& .MuiTableRow-root": {
  //     "&:nth-child(even)": {
  //       backgroundColor: colors.ln10,
  //     },
  //   },
  // },
  "& .MuiTableRow-root": {
    "&.Mui-selected": {
      border: `2px solid ${colors.sb50}`,
      backgroundColor: "transparent",
    },
  },
});

export const HeadCellWrapper = styled("div")<HeaderWrapperProps>(
  ({ isSort }) => ({
    display: isSort ? "flex" : "block",
    justifyContent: "space-between",
    alignItems: "center",
  })
);

export const HeaderShorter = styled("div")({
  display: "flex",
  flexDirection: "column",
  "& svg": {
    color: colors.p300,
    "&:first-child": {
      marginBottom: -4,
    },
    "&:last-child": {
      marginTop: -4,
    },
  },
});
