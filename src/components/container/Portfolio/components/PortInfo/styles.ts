import colors from "@/src/themes/colors";
import { Select } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  alignItems: "center",
  backgroundColor: theme.palette.mode === "dark" ? colors.p100 : colors.sy10,
  borderRadius: theme.spacing(2),
}));
