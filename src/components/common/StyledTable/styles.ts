import colors from "@src/themes/colors";
import { styled } from "@mui/system";
import { TableContainer } from "@mui/material";

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

export const HeadCellWrapper = styled("div")({
  display: "block",
  justifyContent: "space-between",
  alignItems: "center",
  "&.isSort": {
    display: "flex",
  },
});
