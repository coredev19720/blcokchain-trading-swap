import colors from "@/src/themes/colors";
import { Select } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 16,
}));

export const PowerBuying = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  padding: theme.spacing(2, 4),
  background: colors.sy10,
  borderRadius: theme.spacing(1),
}));

export const PriceInfo = styled("div")(() => ({
  display: "flex",
  gap: 8,
  justifyContent: "space-around",
}));
export const PriceBlock = styled("div")(() => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
}));
