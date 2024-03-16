import colors from "@/src/themes/colors";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  padding: 16,
  flexDirection: "column",
}));

export const RowWrapper = styled("div")<{
  isHeader?: boolean;
  bgColor?: string;
}>(({ theme, isHeader, bgColor }) => ({
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  borderRadius: 8,
  ...(isHeader
    ? {
        padding: theme.spacing(2, 4),
      }
    : {
        padding: theme.spacing(0, 4),
      }),
  ...(bgColor ? { backgroundColor: bgColor } : {}),
}));

export const DetailText = styled(Typography)({
  fontWeight: 600,
  width: "100%",
  textAlign: "right",
});
