import colors from "@/src/themes/colors";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  background: theme.palette.mode === "dark" ? colors.p100 : colors.p300,
  flexDirection: "column",
}));

export const OTP = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
}));
export const OTPInput = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  width: "100%",
  alignItems: "stretch",
}));

export const OTPButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  whiteSpace: "nowrap",
  width: 120,
  minWidth: 120,
}));
