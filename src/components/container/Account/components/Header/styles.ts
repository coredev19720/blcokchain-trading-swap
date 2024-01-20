import colors from "@/src/themes/colors";
import { Select } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 16,
  justifyContent: "space-between",
  padding: 16,
  borderBottom: `1px solid ${colors.mn20}`,
  alignItems: "center",
}));
export const AccountSelect = styled(Select)(() => ({
  padding: 0,
  background: "none",
  "&:before, &:after": {
    borderBottom: "none",
  },
  "&:focus": {
    background: "none",
  },
  "& .MuiSelect-select": {
    "&:hover, &:focus": {
      background: "none",
    },
  },
}));
