import colors from "@/src/themes/colors";
import { Button, Select } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 16,
  justifyContent: "space-between",
  padding: 16,
  borderBottom: `1px solid ${colors.mn20}`,
  alignItems: "center",
  flexDirection: "column",
}));

export const Content = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(3, 4),
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
