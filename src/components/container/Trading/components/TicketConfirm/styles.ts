import { TSide } from "@enum/common";
import colors from "@src/themes/colors";
import { Typography } from "@mui/material";
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
  background: theme.palette.common.background,
}));

export const TicketSide = styled("div")<{ side: TSide }>(({ theme, side }) => ({
  padding: theme.spacing(1),
  borderRadius: 4,
  backgroundColor: side === TSide.buy ? colors.sg10 : colors.sr10,
}));

export const Actions = styled("div")(({ theme }) => ({
  background: theme.palette.common.background,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
