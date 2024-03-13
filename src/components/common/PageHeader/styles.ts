import colors from "@src/themes/colors";
import { Select } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 16,
  justifyContent: "space-between",
  padding: "8px 16px",
  borderBottom: `1px solid ${colors.mn20}`,
  alignItems: "center",
}));
export const AccountSelect = styled(Select)(() => ({
  padding: 0,
  background: "none",
  fontSize: 12,
  height: "auto",
  "&:before, &:after": {
    borderBottom: "none",
  },
  "&:focus": {
    background: "none",
  },
  "& .MuiSelect-select": {
    padding: 0,
    "&:hover, &:focus": {
      background: "none",
    },
  },
}));

export const Title = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
}));
