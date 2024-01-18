import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  padding: 16,
  flexDirection: "column",
}));

export const RowWrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
}));
