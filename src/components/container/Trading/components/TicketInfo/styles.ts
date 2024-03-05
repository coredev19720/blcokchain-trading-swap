import colors from "@src/themes/colors";
import { Grid, Select } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 16,
  justifyContent: "space-between",
  alignItems: "center",
}));
export const FieldBlock = styled(Grid)(() => ({
  display: "flex",
  gap: 4,
  flexDirection: "column",
}));
