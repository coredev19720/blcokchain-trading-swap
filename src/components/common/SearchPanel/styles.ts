import colors from "@src/themes/colors";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  gap: 8,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  background: theme.palette.common.background,
  overflow: "auto",
  padding: 16,
  width: "100%",
}));

export const TickerWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
}));

export const Tickers = styled("div")(({ theme }) => ({
  flex: 1,
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));
