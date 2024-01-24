import { TSide } from "@/src/enum";
import colors from "@/src/themes/colors";
import { Grid, Select, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
  height: "auto",
  position: "absolute",
  bottom: 0,
  background: colors.mn20,
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
  zIndex: 1,
}));
export const TicketInfo = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
export const Block = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: theme.palette.mode === "dark" ? colors.p100 : colors.p300,
}));

export const FlexContent = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
}));

export const TicketSide = styled("div")<{ side: TSide }>(({ theme, side }) => ({
  padding: theme.spacing(1),
  borderRadius: 4,
  backgroundColor: side === TSide.BUY ? colors.sg10 : colors.sr10,
}));
