import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));
export const Content = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
}));
export const OrderList = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  flex: 1,
}));
