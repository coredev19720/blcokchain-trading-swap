import colors from "@/src/themes/colors";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  gap: 16,
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  background: colors.p300,
  maxWidth: 600,
}));

export const InputWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 8,
}));

export const TickerWrapper = styled("div")(({ theme }) => ({}));
