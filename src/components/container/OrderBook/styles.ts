import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

export const OrderList = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  flex: 1,
}));
