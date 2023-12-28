import colors from "@/src/themes/colors";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  gap: 8,
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: colors.p300,
  overflow: "auto",
}));

export const InputWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 8,
}));

export const TickerWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
}));
