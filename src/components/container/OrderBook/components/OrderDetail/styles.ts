import { TSide } from "@enum/common";
import colors from "@src/themes/colors";
import { Button, Select } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  paddingTop: 0,
  borderBottom: `1px solid ${colors.mn20}`,
  background: colors.neutral4,
  width: "100%",
  position: "absolute",
  bottom: 0,
  left: 0,
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
}));

export const Content = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(3, 4),
  background: colors.p300,
  borderRadius: theme.spacing(1),
}));

export const Actions = styled("div")(({ theme }) => ({
  gap: theme.spacing(4),
  flexDirection: "column",
  display: "flex",
  padding: theme.spacing(4),
  marginLeft: theme.spacing(-4),
  width: "calc(100% + 32px)",
  background: theme.palette.mode === "dark" ? colors.p100 : colors.p300,
}));

export const Action = styled(Button)(() => ({
  flex: 1,
}));
export const TicketSide = styled("div")<{ side?: TSide }>(
  ({ theme, side }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: side === TSide.buy ? colors.sg10 : colors.sr10,
  })
);

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
