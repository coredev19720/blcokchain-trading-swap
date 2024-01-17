import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 4),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

export const BackButton = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
}));
