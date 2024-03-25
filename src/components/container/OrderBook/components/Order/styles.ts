import { TSide } from "@enum/common";
import colors from "@src/themes/colors";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16,
  borderBottom: `1px solid ${colors.mn20}`,
  background: colors.neutral4,
}));

export const Content = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(3, 4),
  background: theme.palette.common.background,
  borderRadius: theme.spacing(1),
}));

export const Actions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
  width: "100%",
}));

export const Action = styled(Button)(({ theme }) => ({
  flex: 1,
}));
export const TicketSide = styled("div")<{ side: TSide }>(({ theme, side }) => ({
  padding: theme.spacing(1),
  borderRadius: 4,
  backgroundColor: side === TSide.buy ? colors.sg10 : colors.sr10,
}));

export const StatusBar = styled("div")<{ fillPct: number }>(
  ({ theme, fillPct }) => ({
    position: "relative",
    height: 2,
    width: "100%",
    backgroundColor:
      theme.palette.mode === "dark" ? colors.p100 : colors.neutral1,
    "&::before": {
      content: "''",
      backgroundColor:
        theme.palette.mode === "dark" ? colors.p100 : colors.brand1,
      position: "absolute",
      height: "100%",
      width: `${fillPct}%`,
      left: 0,
      top: 0,
    },
  })
);
